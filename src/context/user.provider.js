import { useState } from "react";
import UserContext from "./user.context";
import { useEffect } from "react";
import {
  doLoginInLocalStorage,
  doLogoutFromLocalStorage,
  getDataFromLocalStorage,
  isLoggedIn,
} from "../auth/helper.auth";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  /*
    userData: {
        jwtToken: "",
        user: {

        }
    }
  */

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUserData(getDataFromLocalStorage());
  }, []);

  // login
  const doLogin = (data) => {
    doLoginInLocalStorage(data);
    setIsLogin(true);
    setUserData(getDataFromLocalStorage());
  };

  // logout
  const doLogout = () => {
    doLogoutFromLocalStorage();
    setIsLogin(false);
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        // you can remove setUserData function
        setUserData: setUserData,
        isLogin: isLogin,
        // you can remove setIsLogin function
        setIsLogin: setIsLogin,
        login: doLogin,
        logout: doLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
