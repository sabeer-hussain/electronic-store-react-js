import { useContext } from "react";
import CartContext from "../context/CartContext";

function Cart() {
  const { cart, setCart, addItem, removeItem } = useContext(CartContext);

  return <div className="p-5">This is Cart page</div>;
}

export default Cart;
