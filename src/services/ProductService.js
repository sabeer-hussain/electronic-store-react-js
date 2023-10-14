import { getTokenFromLocalStorage } from "../auth/HelperAuth";
import { privateAxios } from "./AxiosService";
import { BASE_URL } from "./HelperService";

// product related api calls

// create product without category
export const createProductWithoutCategory = (product) => {
  return privateAxios
    .post("/products", product)
    .then((response) => response.data);
};

// create product with category
export const createProductInCategory = (product, categoryId) => {
  return privateAxios
    .post(`/categories/${categoryId}/products`, product)
    .then((response) => response.data);
};

// add product image
export const addProductImage = (file, productId) => {
  const formData = new FormData();
  formData.append("productImage", file);
  return privateAxios
    .post(`/products/image/${productId}`, formData)
    .then((response) => response.data);
};

// get products
export const getAllProducts = (
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxios
    .get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};

// serve product image
export const getProductImage = async (productId) => {
  const jwtToken = getTokenFromLocalStorage();
  const productImage = await fetch(
    `${BASE_URL}/products/image/${productId}?${new Date().getTime()}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  )
    .then(getBase64Image)
    .then((imgString) => imgString);

  return productImage;
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

// delete the product
export const deleteProduct = (productId) => {
  return privateAxios
    .delete(`/products/${productId}`)
    .then((response) => response.data);
};
