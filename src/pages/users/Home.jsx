import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="text-center mt-5">
      {/* {console.log(userContext)} */}
      {/* {JSON.stringify(userContext)} */}
      <h1>Welcome {userContext.userData?.user?.name}</h1>
      {/* <h1>User is logged in : {String(userContext.isLogin)}</h1> */}
      <Button
        as={Link}
        to={`/users/profile/${userContext.userData?.user?.userId}`}
      >
        Go to my Profile
      </Button>
      <Button as={Link} to={"/store"} variant="success" className="ms-2">
        Go to Store
      </Button>
    </div>
  );
};

export default Home;
