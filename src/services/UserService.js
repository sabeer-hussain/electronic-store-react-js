// user related api calls

import { publicAxios } from "./AxiosService";
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
export const getUser = (userId, jwtToken) => {
  return publicAxios
    .get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then((response) => response.data);
};

// serve user image
export const getUserImage = async (userId, jwtToken) => {
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
