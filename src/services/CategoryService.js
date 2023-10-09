// category related api calls

import { privateAxios } from "./AxiosService";

// add new category
export const addCategory = (category) => {
  return privateAxios
    .post("/categories", category)
    .then((response) => response.data);
};
