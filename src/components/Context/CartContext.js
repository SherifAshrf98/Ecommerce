import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {

  const { Token } = useContext(AuthContext);

  const [numOfCartItems, setNumOfCartItems] = useState(0);

  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const [allProducts, setallProducts] = useState(null);

  const [cartId, setCartId] = useState(null);
  
  async function AddProductToCart(id) {
    const res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",

        { productId: id },

        { headers: { token: localStorage.getItem("token") } }
      )
      .then((res) => {
        // setNumOfCartItems(res.data.numOfCartItems);

        // setTotalCartPrice(res.data.data.totalCartPrice);

        // setallProducts(res.data.data.products);
        getUserCart();

        return true;
      })
      .catch((error) => {
        console.log(res);
        return false;
      });

    return res;
  }
  
   function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setCartId(res.data.data._id);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setallProducts(res.data.data.products);
      })
      .catch((res) => {});
  }

  async function UpdateCartCount(id, newCount) {
    const res = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setallProducts(res.data.data.products);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return res;
  }

  async function RemoveCartItem(id) {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setallProducts(res.data.data.products);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return res;
  }

  async function ClearCart() {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setallProducts([]);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return res;
  }

  useEffect(() => {
    getUserCart();
  }, [Token]);

  return (
    <>
      <CartContext.Provider
        value={{
          AddProductToCart,
          numOfCartItems,
          totalCartPrice,
          allProducts,
          UpdateCartCount,
          RemoveCartItem,
          ClearCart,
          cartId,
          getUserCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
