import React, { useContext, useEffect } from "react";
import { getTokenFromLocalStorage } from "../auth/HelperAuth";
import { isJwtExpired } from "jwt-check-expiration";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const useJwtTokenExpiration = () => {
  const [flag, setFlag] = useState(false);

  const { logout } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    try {
      if (isJwtExpired(token)) {
        console.log("token is expired");
        // perform other operations
        setFlag(true);
        toast.error("Session Expired !! Relogin");
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return flag;
};

export default useJwtTokenExpiration;
