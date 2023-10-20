import { privateAxios } from "../services/AxiosService";

// all the functions calling api related to order

// get orders: async and await
export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
  const result = await privateAxios.get(
    `/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
  );
  return result.data;
};

// update order
export const updateOrder = async (order, orderId) => {
  const result = await privateAxios.put(`/orders/${orderId}`, order);
  return result.data;
};
