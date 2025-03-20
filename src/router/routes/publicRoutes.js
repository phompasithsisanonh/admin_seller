import React from "react";
const Home  = React.lazy(() => import("../../views/Home"));
const Login = React.lazy(() => import("../../views/auth/Login"));
const Register = React.lazy(() => import("../../views/auth/Register"));
const AdminLogin = React.lazy(() => import("../../views/auth/AdminLogin"));
const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

];

export default publicRoutes;
