import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/order", element: <Order /> },
  { path: "/cart", element: <Cart /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/productinfo/:id", element: <ProductInfo /> },
  { path: "/addproduct", element: <AddProduct /> },
  { path: "/updateproduct", element: <UpdateProduct /> },
  { path: "/*", element: <NoPage /> },
]);

const App = () => {
  return (
    <MyState>
      <RouterProvider router={router} />
    </MyState>
  );
};

export default App;
