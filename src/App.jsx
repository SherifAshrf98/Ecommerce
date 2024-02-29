import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import NotFound from './components/NotFound/NotFound';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import AuthContextProvider from "./components/Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from "./components/Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./components/Payment/Payment";


const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "products", element: <Products /> },
      { path: "login", element: <Login /> },
      { path: "Home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "payment", element: <ProtectedRoute><Payment/></ProtectedRoute> },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);



export default function App() {

  const myClint = new QueryClient()

  return (
    <>
      <QueryClientProvider client={myClint}>
        <AuthContextProvider>
          <CartContextProvider>
            <RouterProvider router={myRouter} />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>

      <Toaster />
    </>
  );
}
