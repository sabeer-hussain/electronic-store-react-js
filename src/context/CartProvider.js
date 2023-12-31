import React, { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import {
  addItemToCart,
  clearCart,
  getCart,
  removeItemFromCart,
} from "../services/CartService";
import UserContext from "./UserContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert } from "react-bootstrap";

const CartProvider = ({ children }) => {
  const { isLogin, userData } = useContext(UserContext);
  const [cart, setCart] = useState(null);

  const MySwal = withReactContent(Swal);

  // load user cart initially
  const loadUserCart = async (userId) => {
    try {
      const cartData = await getCart(userId);
      setCart({ ...cartData });
      console.log(cartData);
    } catch (error) {
      console.log(error);
      setCart({ items: [] });
    }
  };

  useEffect(() => {
    if (isLogin) {
      // get user cart
      loadUserCart(userData.user.userId);
    } else {
      setCart(null);
    }
  }, [isLogin]);

  // add item to cart
  const addItem = async (productId, quantity, next) => {
    try {
      if (!isLogin) {
        MySwal.fire({
          title: "Not Logged In",
          html: (
            <>
              <Alert className="border border-0" variant="danger">
                Please do login to add items to cart
              </Alert>
            </>
          ),
          icon: "error",
        }).then(() => {});
        return;
      }

      const result = await addItemToCart(
        userData.user.userId,
        productId,
        quantity
      );
      setCart({ ...result });
      // if (quantity > 1) {
      //   toast.success("Quantity updated", {
      //     position: "top-right",
      //   });
      // } else {
      //   toast.success("Item added to cart", {
      //     position: "top-right",
      //   });
      // }
      next();
    } catch (error) {
      console.log(error);
      toast.error("error in adding product in cart");
    }
  };

  // remove item from cart
  const removeItem = async (itemId) => {
    try {
      const result = await removeItemFromCart(userData.user.userId, itemId);
      const newCartItems = cart.items.filter(
        (item) => item.cartItemId !== itemId
      );
      console.log(newCartItems);
      setCart({
        ...cart,
        items: newCartItems,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in removing items from cart");
    }
  };

  // clear cart
  const clear = async () => {
    try {
      const result = await clearCart(userData.user.userId);
      console.log(result);
      setCart({
        ...cart,
        items: [],
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in clearing cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addItem, removeItem, clearCart: clear }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
