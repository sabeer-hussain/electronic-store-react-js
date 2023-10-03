import { useState } from "react";
import UserContext from "./user.context";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserDatta] = useState(null);
  /*
    userData: {
        jwtToken: "",
        user: {

        }
    }
  */

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        setUserData: setUserDatta,
        isLogin: isLogin,
        setIsLogin: setIsLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
