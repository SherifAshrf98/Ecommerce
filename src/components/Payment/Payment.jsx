import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function Payment() {

    const { cartId, getUserCart } = useContext(CartContext)

    const nav = useNavigate()

    async function ConfirmCashPayment() {

        const details = document.getElementById("details").value

        const phone = document.getElementById("phone").value

        const city = document.getElementById("city").value

        const ShippingDetails = {

            "shippingAddress": {
                details,
                phone,
                city
            }
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, ShippingDetails, {

            headers: { token: localStorage.getItem("token") }

        }).then((res) => {

            console.log(res);

            if (res.data.status === "success") {
                toast.success("Payment is done Succesfully ")

                getUserCart();
               

                setTimeout(() => {
                    nav("/")
                }, 1500)
            }


        }).catch(() => {

            toast.error("error occured ")

        })

    }
    return <>
        <div className="w-75 m-auto mt-5">

            

                <label htmlFor="Details">Details</label>
                <input className='form-control mb-4' required id='details' type="text" />

                <label htmlFor="phone">phone</label>
                <input className='form-control mb-4' required id='phone' type="tel" />

                <label htmlFor="city">city</label>
                <textarea className='form-control mb-4' required id='city' type="text" ></textarea>

                <button  onClick={ConfirmCashPayment} className='btn btn-outline-success'>Pay now</button>

           
        </div>
    </>
}
