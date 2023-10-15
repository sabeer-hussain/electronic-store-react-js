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

// update product service
export const updateProduct = (product, productId) => {
  return privateAxios
    .put(`/products/${productId}`, product)
    .then((response) => response.data);
};

// update product image
export const updateProductImage = (file, productId) => {
  const formData = new FormData();
  formData.append("productImage", file);
  return privateAxios
    .put(`/products/image/${productId}`, formData)
    .then((response) => response.data);
};

// update the category of the product
export const updateCategoryOfProduct = (categoryId, productId) => {
  return privateAxios
    .put(`/categories/${categoryId}/products/${productId}`)
    .then((response) => response.data);
};

// search products
export const searchProducts = (query) => {
  return privateAxios
    .get(`/products/search/${query}`)
    .then((response) => response.data);
};
