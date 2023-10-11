import { privateAxios } from "./AxiosService";

// product related api calls

// create product without category
export const createProductWithoutCategory = (product) => {
  return privateAxios
    .post("/products", product)
    .then((response) => response.data);
};
