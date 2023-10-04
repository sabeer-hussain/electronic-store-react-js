// data : save localStorage
export const doLoginInLocalStorage = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
  // next();
};

// data : fetch user
export const getUserFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  if (data !== null) {
    return data.user;
  }
  return null;
};

// data : fetch token
export const getTokenFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  if (data !== null) {
    return data.jwtToken;
  }
  return null;
};

// data : fetch user data (token and user)
export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem("userData");
  if (data && data !== "undefined") {
    return JSON.parse(data);
  }
  return null;
};

// check user logged in or not
export const isLoggedIn = () => {
  if (getTokenFromLocalStorage() !== null) {
    // get token from server call if needed
    return true;
  }
  return false;
};

// check user is admin or not
export const isAdminUser = () => {
  if (isLoggedIn()) {
    const user = getUserFromLocalStorage();
    const roles = user.roles;
    if (roles.find((role) => role.roleId === "wetrsdfwetwfasfwdf")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// data : remove : logout
export const doLogoutFromLocalStorage = () => {
  localStorage.removeItem("userData");
};
