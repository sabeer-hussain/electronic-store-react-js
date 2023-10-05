// user related api calls

import { getTokenFromLocalStorage } from "../auth/HelperAuth";
import { privateAxios, publicAxios } from "./AxiosService";
import { BASE_URL } from "./HelperService";

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
export const getUser = (userId) => {
  return privateAxios.get(`/users/${userId}`).then((response) => response.data);
};

// serve user image
export const getUserImage = async (userId) => {
  const jwtToken = getTokenFromLocalStorage();
  const userImage = await fetch(`${BASE_URL}/users/image/${userId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then(getBase64Image)
    .then((imgString) => imgString);

  return userImage;
};

const getBase64Image = async (res) => {
  const blob = await res.blob();

  const reader = new FileReader();

  await new Promise((resolve, reject) => {
    reader.onload = resolve;
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return reader.result;
};

// update user
export const updateUser = (user) => {
  return privateAxios
    .put(`/users/${user.userId}`, user)
    .then((response) => response.data);
};
