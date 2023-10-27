import { privateAxios } from "./AxiosService";

// get cart
export const getCart = async (userId) => {
  const response = await privateAxios.get(`/carts/${userId}`);
  return response.data;
};

// add item to cart
export const addItemToCart = async (userId, productId, quantity) => {
  const response = await privateAxios.post(`/carts/${userId}`, {
    productId,
    quantity,
  });
  return response.data;
};

// clear cart
export const clearCart = async (userId) => {
  const response = await privateAxios.delete(`/carts/${userId}`);
  return response.data;
};

// remove item from cart
export const removeItemFromCart = async (userId, itemId) => {
  const response = await privateAxios.delete(
    `/carts/${userId}/items/${itemId}`
  );
  return response.data;
};

// write other cart related services
