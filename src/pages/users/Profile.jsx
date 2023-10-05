import { Alert, Col, Container, Row } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import UserProfileView from "../../components/users/UserProfileView";
import { useContext, useEffect, useState } from "react";
import { getUser, getUserImage } from "../../services/UserService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Profile = () => {
  const userContext = useContext(UserContext);

  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    // to get user data using context
    // if (userContext.userData) {
    //   getUserDataFromServer();
    // }

    // If we use params approach, then we dont need to use if condition bcoz userId will be available
    // in the profile url before we click the profile button. But since we needed jwtToken, we are
    // keeping it.
    // console.log("data from url userid " + userId);
    if (userContext.userData) {
      getUserDataFromServer();
    }
  }, [userContext.userData]);

  const getUserDataFromServer = async () => {
    // api call
    console.log(userContext);

    // const userId = userContext.userData.user.userId;
    const jwtToken = userContext.userData.jwtToken;
    getUser(userId, jwtToken)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        toast.error("Error in loading user information from server !!");
      });
    setUserImage(await getUserImage(userId, jwtToken));
  };

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            {user ? (
              <UserProfileView
                user={
                  //   {
                  //   name: "Sabeer Hussain",
                  //   email: "msabeerhussain007@gmail.com",
                  //   gender: "Male",
                  //   about: "I am java developer",
                  //   roles: [
                  //     { roldId: 1, roleName: "ADMIN" },
                  //     { roleId: 2, roleName: "NORMAL" },
                  //   ],
                  // }
                  user
                }
                userImage={userImage}
              />
            ) : (
              <Alert>
                <h3 className="text-center text-uppercase m-2">
                  User not loaded from server !
                </h3>
              </Alert>
            )}
            {/* {userContext.userData.user.userId} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
