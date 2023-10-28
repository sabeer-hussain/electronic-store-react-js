import { useContext, useEffect, useState } from "react";
import { getOrdersOfUser } from "../../services/OrderService";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";

const Order = () => {
  const { userData, isLogin } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrdersOfUser();
  }, []);

  const loadOrdersOfUser = async () => {
    try {
      const result = await getOrdersOfUser(userData.user.userId);
      console.log(result);
      setOrders(result);
    } catch (error) {
      console.log(error);
      toast.error("Error in loading orders");
    }
  };

  return <h1>This is order</h1>;
};

export default Order;
