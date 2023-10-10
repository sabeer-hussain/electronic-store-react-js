// category related api calls

import { privateAxios } from "./AxiosService";

// add new category
export const addCategory = (category) => {
  return privateAxios
    .post("/categories", category)
    .then((response) => response.data);
};

// get all categories
export const getCategories = () => {
  return privateAxios.get("/categories").then((response) => response.data);
};

// delete category
export const deleteCategory = (categoryId) => {
  return privateAxios
    .delete(`/categories/${categoryId}`)
    .then((response) => response.data);
};
