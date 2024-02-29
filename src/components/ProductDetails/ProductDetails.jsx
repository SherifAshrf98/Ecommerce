import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ProductDetails() {

  const { AddProductToCart } = useContext(CartContext)

  const { id } = useParams()

  async function addMyProductD(id) {

    const res = await AddProductToCart(id)

    if (res) {
      toast.success("item added successfully", { duration: 2000, position: "top-right" })
      console.log("eloo");
    }
    else {
      toast.error("Error occured", { duration: 2000, position: "top-right" })
      console.log("no");

    }


  }

  function getProductDetails() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

  }

  const { data, isLoading, isError } = useQuery(`productdetails-${id}`, getProductDetails)

  const product = data?.data?.data;

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
  if (isError) {
    return <Navigate to={"/products"} />

  }
  return (
    <>
      <Helmet>
        <title>{product?.title}</title>
      </Helmet>
      <div className="container">

        <div className="row align-items-center mt-5">

          <div className="col-md-4">
            <figure className="border border-2">
              <img className="w-100" src={product.images[0]} alt={product.title} />
            </figure>
          </div>

          <div className="col-md-8 ">
            <article>
              <h1>{product?.title}</h1>
              <p>{product?.description}</p>
              <div className="d-flex justify-content-between">
                <p>{product?.price} <span>EGP</span></p>
                <p><span><i className="fa-solid fa-star text-warning"></i></span>{product?.ratingsAverage}</p>
              </div>
              <button onClick={() => addMyProductD(product.id)} className="btn btn-success w-100" > Add To Cart</button>
            </article>
          </div>

        </div>
      </div>


    </>
  );
}
