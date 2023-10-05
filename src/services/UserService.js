// user related api calls

import { publicAxios } from "./AxiosService";

// register new user
export const registerUser = (userData) => {
  return publicAxios.post("/users", userData).then((response) => response.data);
};

// login user
export const loginUser = (loginData) => {
  return publicAxios
    .post("/auth/login", loginData)
    .then((response) => response.data);
};

// get user
export const getUser = (userId, jwtToken) => {
  return publicAxios
    .get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then((response) => response.data);
};
