import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Home = () => {
  const userContext = useContext(UserContext);

  return (
    <div>
      {/* {console.log(userContext)} */}
      {/* {JSON.stringify(userContext)} */}
      <h1>Welcome {userContext.userData?.user?.name}</h1>
      <h1>User is logged in : {String(userContext.isLogin)}</h1>
    </div>
  );
};

export default Home;
