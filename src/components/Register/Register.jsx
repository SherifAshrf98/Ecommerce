import React, { useRef, useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const phoneRegex = /^(\+20|0)?1[0-9]{9}$/;

  const navigate = useNavigate()

  let validationSchema = Yup.object({

    name: Yup.string().min(3, "name length must be 3 letters at minimum").max(10, "name length must be 10 letters at maximum").required("name is required"),

    email: Yup.string().email("please enter a vaild email").required("email is required"),

    password: Yup.string().required("password is required").matches(passwordRegex,),

    rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")], "password and rePassword don't match"),

    phone: Yup.string().required("phone is required").matches(phoneRegex, "please enter a valid phone number")

  })

  const [isSuccess, setIsSuccess] = useState();

  const [errorMessage, setErrorMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false)

  const [toLogin, setToLogin] = useState(false)

  const toLoginRef = useRef(toLogin)

  function mySubmit(values) {

    setIsLoading(true);

    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)

      .then((request) => {

        setErrorMessage(null)

        setIsSuccess(true)

        toLoginRef.current = true;

      })

      .catch((request) => {
      
        
        setErrorMessage(request.response.data.message)

        setToLogin(false)
        
        toLoginRef.current = false;
      
      })

      .finally(() => {

        setIsLoading(false)

        setTimeout(() => {


          (toLoginRef.current ? navigate('/login') : console.log(0))


        }, 3000);

      })

  }

  const formik = useFormik({

    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },

    validationSchema,

    onSubmit: mySubmit,

  })

  return (
    <>
      <div className="w-50 m-auto p-5">

        {isSuccess ? <div className="alert alert-success">Congrats your account has been registerd successfully</div> : ""}

        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ""}

        <h2>Register Now:</h2>

        <form onSubmit={formik.handleSubmit} >

          <label htmlFor="name" className="mb-1" >name:</label>
          <input id="name" type="text" placeholder="name" className="form-control mb-3" name="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger mt-2 p-2"><span>{formik.errors.name}</span></div> : ''}

          <label htmlFor="email" className="mb-1">email:</label>
          <input id="email" type="email" placeholder="email" className="form-control mb-3" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p-2"><span>{formik.errors.email}</span></div> : ''}

          <label htmlFor="password" className="mb-1">password:</label>
          <input id="password" type="password" placeholder="password" className="form-control mb-3" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 p-2"><PasswordRequirements /></div> : ''}

          <label htmlFor="rePassword" className="mb-1">rePassword:</label>
          <input id="rePassword" type="password" placeholder="rePassword" className="form-control mb-3" name="rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger mt-2 p-2"><span>{formik.errors.rePassword}</span></div> : ''}

          <label htmlFor="phone" className="mb-1">phone:</label>
          <input id="phone" type="text" placeholder="phone" className="form-control mb-3" name="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger mt-2 p-2"><span>{formik.errors.phone}</span></div> : ''}

          <button type="submit" disabled={(!(formik.isValid && formik.dirty) || isLoading)} className="ms-auto btn text-white rounded-3 bg-main d-block ">Register</button>

        </form>

      </div>
    </>
  );
}

const PasswordRequirements = () => {
  return (
    <div className="password-warning">
      <strong>Password Requirements:</strong>
      <ul>
        <li>Minimum length: 8 characters</li>
        <li>At least one uppercase letter (A-Z)</li>
        <li>At least one lowercase letter (a-z)</li>
        <li>At least one digit (0-9)</li>
        <li>At least one special character among [@ $ ! % * ? &]</li>
      </ul>
      <p><strong>Please ensure that your password meets these criteria for better security.</strong></p>
    </div>
  );
};