import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/order", element: <Order /> },
  { path: "/cart", element: <Cart /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/*", element: <NoPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;