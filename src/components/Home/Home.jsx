import React from "react";
import HomeSlider from "../HomeSlider/HomeSlider";
import Products from './../Products/Products';
import CategorySlider from "../CategorySlider/CategorySlider";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
   
      <div className="container">
        <div className="row g-0 mt-5">
          <div className="col-md-6  ">
            <HomeSlider />
          </div>
          <div className="col-md-6">
            <img className="w-50 d-block" src={require("../../Assets/images/3.jpg")} alt="" />
            <img className="w-50 d-block" src={require("../../Assets/images/4.jpg")} alt="" />
          </div>
        </div>
      </div>
      <CategorySlider />
      <Products />
      <Helmet>
        <title>Home</title>
      </Helmet>
    </>
  );
}
