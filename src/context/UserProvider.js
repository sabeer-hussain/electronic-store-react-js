import { useState } from "react";
import UserContext from "./UserContext";
import { useEffect } from "react";
import {
  doLoginInLocalStorage,
  doLogoutFromLocalStorage,
  getDataFromLocalStorage,
  isAdminUser as adminUser,
  isLoggedIn,
} from "../auth/HelperAuth";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  /*
    userData: {
        jwtToken: "",
        user: {

        }
    }
  */

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setIsAdminUser(adminUser());
    setUserData(getDataFromLocalStorage());
  }, []);

  // login
  const doLogin = (data) => {
    doLoginInLocalStorage(data);
    setIsLogin(true);
    setIsAdminUser(adminUser());
    setUserData(getDataFromLocalStorage());
  };

  // logout
  const doLogout = () => {
    doLogoutFromLocalStorage();
    setIsLogin(false);
    setIsAdminUser(adminUser());
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        // you can remove setUserData function
        setUserData: setUserData,
        isLogin: isLogin,
        isAdminUser: isAdminUser,
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
