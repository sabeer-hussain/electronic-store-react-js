import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import UserContext from "../../context/UserContext";
import UserProfileView from "../../components/users/UserProfileView";
import { useContext, useEffect, useState } from "react";
import { getUser, getUserImage, updateUser } from "../../services/UserService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Profile = () => {
  const userContext = useContext(UserContext);

  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);

  // modals state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);

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

  const updateFieldHandler = (event, property) => {
    setUser({
      ...user,
      [property]: event.target.value,
    });
  };

  const updateUserData = () => {
    console.log("updating user data");
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("user name required !!");
      return;
    }

    // ... rest of the field if needed

    updateUser(user)
      .then((updatedUser) => {
        console.log(updatedUser);
        toast.success("User details updated !!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not updated !! Error");
      });
  };

  // update view
  const updateViewModal = () => {
    return (
      <div>
        <Modal size="lg" animation={false} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update the Informations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card
              className="border-0 shadow-sm"
              style={{ borderRadius: "50px" }}
            >
              <Card.Body>
                <Table className="text-center" responsive hover>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>
                        <Form.Control
                          className="text-center"
                          type="text"
                          value={user.name}
                          onChange={(event) =>
                            updateFieldHandler(event, "name")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <td>New Password</td>
                      <td>
                        <Form.Control
                          className="text-center"
                          type="password"
                          placeholder="Enter new password here"
                          onChange={(event) =>
                            updateFieldHandler(event, "password")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>
                        <Form.Check
                          inline
                          name="gender"
                          label="Male"
                          type={"radio"}
                          id={"gender"}
                          value={"male"}
                          checked={user.gender === "male"}
                          onChange={(event) =>
                            updateFieldHandler(event, "gender")
                          }
                        />
                        <Form.Check
                          inline
                          name="gender"
                          label="Female"
                          type={"radio"}
                          id={"gender"}
                          value={user.gender && "female"}
                          checked={user.gender === "female"}
                          onChange={(event) =>
                            updateFieldHandler(event, "gender")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>About</td>
                      <td>
                        <Form.Control
                          as={"textarea"}
                          rows={"8"}
                          value={user.about}
                          onChange={(event) =>
                            updateFieldHandler(event, "about")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Roles</td>
                      <td>
                        {user.roles.map((role) => (
                          <div key={role.roleId}>{role.roleName}</div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUserData}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            {user ? (
              <>
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
                  handleShowModal={handleShowModal}
                />
                {updateViewModal()}
              </>
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
