import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg"
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";

export default function Nav() {
  const { numOfCartItems } = useContext(CartContext)

  const { Token, setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  function Logout() {

    setToken("");

    localStorage.removeItem("token");

    navigate('/login')

  }



  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand ms-5">
            <img src={logo} alt="Fresh cart" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {Token ? <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">Brands</Link>
              </li>
            </ul> : ""}


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center ">
              <li className="nav-item position-relative ">
                <Link to="cart"><i className="fa-solid fa-shopping-cart fs-4  text-success "></i></Link>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {numOfCartItems ? numOfCartItems : ""}
                </span>
              </li>
              {Token ? <li className="nav-item">
                <span onClick={() => { Logout() }} role="button" className="mx-3 nav-link btn btn-danger" >Logout</span>
              </li> :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className=" nav-link" to="/register">Register</Link>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
}
