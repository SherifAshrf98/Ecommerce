import React from "react";
import Style from "./Cart.module.css";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {

  const { numOfCartItems, totalCartPrice, allProducts, UpdateCartCount, RemoveCartItem, ClearCart } = useContext(CartContext)


  async function updateMyProductCount(id, newCount) {

    const res = await UpdateCartCount(id, newCount)

    if (res) {
      toast.success("product updated successfully", { position: "top-right" })
    } else {
      toast.success("error occured", { position: "top-right" })

    }
  }
  
  async function removeMyItem(id) {
    const res = await RemoveCartItem(id)

    if (res) {
      toast.success("product removed successfully", { position: "top-right" })
    } else {
      toast.success("error occured", { position: "top-right" })

    }
  }

  if (!allProducts) {
    return <>
      <div className="d-flex justify-content-center vh-100 align-items-center ">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#40E0D0"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  }


  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {allProducts.length ? <div className="container bg-light mt-5 p-5">

        <div className="d-flex justify-content-between align-items-center pt-4">
          <h2>Cart Shop</h2>
          <Link to="/payment"><button className="btn btn-primary p-3 fs-5">Check Out</button></Link>
        </div>
        <div className="d-flex justify-content-between align-items-center pt-4 mb-5">
          <h5>total Price : <span className="text-success">{totalCartPrice}</span></h5>
          <h5 className="">total number of items : <span className="text-success">{numOfCartItems}</span></h5>
        </div>

        {allProducts.map((product, idx) => <div key={idx} className="row align-items-center border-bottom">
          <div className="col-md-1 pb-3 pt-3">
            <img className="w-100" src={product.product.imageCover} alt={product.product.title} />
          </div>
          <div className="col-md-9">
            <h4>{product.product.title}</h4>
            <h6>{product.price} EGP</h6>
            <span onClick={() => removeMyItem(product.product.id)} role="button" className=" text-danger" ><i className="fa-solid fa-trash-can"></i> Remove</span>
          </div>
          <div className="col-md-2">
            <div className="d-flex justify-content-around align-items-center">
              <button onClick={() => updateMyProductCount(product.product.id, product.count + 1)} className="btn btn-outline-success">+</button>
              <p className="">{product.count}</p>
              <button disabled={product.count === 1} onClick={() => updateMyProductCount(product.product.id, product.count - 1)} className="btn btn-outline-success">-</button>
            </div>
          </div>
        </div>)}

        <button onClick={() => ClearCart()} className="d-block m-auto btn btn-outline-success px-4 fs-4 mt-4">Clear Your Cart</button>
      </div> : <>
        <div className="container mt-5">

          <div className="d-flex justify-content-between align-items-center pt-4">
            <h2>Cart Shop</h2>
          </div>
          <div className="d-flex justify-content-center align-items-center pt-4">
            <h2>Cart is empty</h2>
          </div>
        </div>
      </>}

    </>
  );
}
