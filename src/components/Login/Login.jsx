import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function Login() {

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  let { Token, setToken } = useContext(AuthContext)

  let validationSchema = Yup.object({

    email: Yup.string().email().required(),
    password: Yup.string().required()

  })

  function mySubmit(values) {

    setIsLoading(true);

    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)

      .then((request) => {

        if (request.data.message === "success") {

          localStorage.setItem("token", request.data.token)

          setToken(request.data.token)

          setErrorMessage(null)

          setIsSuccess(true)

          setLoginMessage(request.data.user.name)

          setTimeout(() => {

            navigate("/products")

          }, 1000)
        }
      })

      .catch((request) => {

        console.log(request);
        setErrorMessage(request.response.data.message)

      })

      .finally(() => {

        setIsLoading(false)

      })

  }

  const formik = useFormik({

    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,

    onSubmit: mySubmit,

  })

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-50 m-auto p-5">

        {isSuccess ? <div className="alert alert-success">Welcome Back {loginMessage} </div> : ""}

        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ""}

        <h2 className="pb-3">Sign In Now:</h2>

        <form onSubmit={formik.handleSubmit} >

          <label htmlFor="email" className="mb-1">email:</label>
          <input id="email" type="email" placeholder="email" className="form-control mb-3" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p-2"><span>{formik.errors.email}</span></div> : ''}

          <label htmlFor="password" className="mb-1">password:</label>
          <input id="password" type="password" placeholder="password" className="form-control mb-3" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div> : ''}


          <button type="submit" disabled={(!(formik.isValid && formik.dirty) || isLoading)} className="ms-auto btn text-white rounded-3 bg-main d-block ">Login</button>

        </form>

      </div>
    </>
  );
}

