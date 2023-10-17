import { privateAxios } from "../services/AxiosService";

// all the functions calling api related to order

// get orders: async and await
export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
  const result = await privateAxios.get(
    `/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
  );
  return result.data;
};
