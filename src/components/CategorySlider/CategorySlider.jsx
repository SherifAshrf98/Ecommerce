import axios from 'axios'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import Slider from "react-slick";


export default function CategorySlider() {

    
    function getCategory() {
        
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    
    }
    
    const { data, isLoading } = useQuery("getCategories", getCategory)

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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
    };
    return (
        <div className="slider-container mt-5">
            <Slider {...settings}>
                {data.data.data.map((eleme, idx) =>
                    <div key={idx}>
                        <img style={{height:300}} className='w-100' src={eleme.image} alt="" />
                        <h4>{eleme.name}</h4>
                    </div>
                )}
            </Slider>
        </div>
    );
}

