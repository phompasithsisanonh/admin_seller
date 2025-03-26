import React from "react";
const ForgotPassword = React.lazy(() => import("../../views/auth/ForgotPassword"));
const ResetPassword= React.lazy(() => import("../../views/auth/ResetPassword"));
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
  {
    path: "/send-email",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword/>,
  },
];

export default publicRoutes;
