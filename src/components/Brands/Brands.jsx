import React from "react";

import axios from "axios";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Brands() {

  function getBrands() {

    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")

  }
  const { data, isLoading } = useQuery("getBrands", getBrands)

  if (isLoading) {

    return <>
      <div className="d-flex justify-content-center vh-100 align-items-center">
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
        <title>Brands</title>
      </Helmet>
      
      <div className="container">
        <div className="row gy-4 mt-3">
          <h2 className="text-center text-main mb-5">All Brands</h2>
          {data.data.data.map((eleme, idx) => <div className="col-md-3 mb-5">
            <div className="category border border-1">
              <img style={{ height: 200 }} className="w-100 " src={eleme.image} alt="" />
              <div className="text-center text-main m-3">
                <h3>{eleme.name}</h3>
              </div>
            </div>
          </div>)}
        </div>

      </div>
    </>
  );
}
