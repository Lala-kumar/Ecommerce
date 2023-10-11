import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import NoPage from "./pages/nopage/NoPage";

import MyState from "./context/myState";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";

// user protected route

export const ProtectedRouteForUser = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

// admin protected route

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin.user.email === "lalak4099@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/order",
    element: (
      <ProtectedRouteForUser>
        <Order />
      </ProtectedRouteForUser>
    ),
  },
  { path: "/cart", element: <Cart /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRouteForAdmin>
        <Dashboard />
      </ProtectedRouteForAdmin>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/productinfo/:id", element: <ProductInfo /> },
  {
    path: "/addproduct",
    element: (
      <ProtectedRouteForAdmin>
        <AddProduct />
      </ProtectedRouteForAdmin>
    ),
  },
  {
    path: "/updateproduct",
    element: (
      <ProtectedRouteForAdmin>
        <UpdateProduct />
      </ProtectedRouteForAdmin>
    ),
  },
  { path: "/*", element: <NoPage /> },
]);

const App = () => {
  return (
    <MyState>
      <RouterProvider router={router} />
      <ToastContainer />
    </MyState>
  );
};

export default App;

