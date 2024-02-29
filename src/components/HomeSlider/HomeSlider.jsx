import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
   
  };
  return (
    <Slider {...settings}>
      <div className="d-flex justify-content-end">
        <img style={{height:"300px"}}src={require("../../Assets/images/1.jpg")} alt="" />
      </div>
      <div className="d-flex justify-content-end  " >
        <img src={require("../../Assets/images/2.jpg")} alt="" />
      </div>
      
    </Slider>
  );
}