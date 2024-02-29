import React, { useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Products() {

  const { AddProductToCart, totalCartPrice, numOfCartItems, allProducts } = useContext(CartContext)


  async function addMyProduct(id) {

    const res = await AddProductToCart(id)

    if (res) {
      toast.success("item added successfully", { duration: 2000, position: "top-right" })
      console.log("eloo", totalCartPrice, numOfCartItems, allProducts);
    }
    else {
      toast.error("Error occured", { duration: 2000, position: "top-right" })
      console.log("no");

    }

  }

  function getAllProducts() {

    return axios.get("https://ecommerce.routemisr.com/api/v1/products")

  }

  const { data, isLoading } = useQuery("getAllProducts", getAllProducts)

  if (isLoading) {

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
        <title>Products</title>
      </Helmet>
      <div className="container">
        <div className="row pt-5">
          {data.data.data.map((product, idx) => {
            return <div key={idx} className="col-md-3 g-3 products">
              <Link to={`/productdetails/${product.id}`}>
                <div className="product px-3 ">
                  <img className="w-100" src={product.imageCover} alt="" />
                  <h3 className="h6 text-main ">{product.category.name}</h3>
                  <h2 className="h6 fw-bold">{product.title}</h2>
                  <div className="d-flex justify-content-between">
                    <p>{product.price} <span>EGP</span></p>
                    <p><span><i className="fa-solid fa-star text-warning"></i></span>{product.ratingsAverage}</p>
                  </div>
                </div>
              </Link>
              <button onClick={() => addMyProduct(product.id)} className="btn btn-success d-block m-auto mb-2">Add To Cart</button>
            </div>
          })}
        </div>
      </div>

    </>
  );
}
