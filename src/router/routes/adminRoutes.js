import { lazy } from "react";
const Orders = lazy(() => import("../../views/admins/Order"));
const Category = lazy(() => import("../../views/admins/Category"));
const Sellers = lazy(() => import("../../views/admins/Sellers"));
const PaymentRequest = lazy(() => import("../../views/admins/PaymentRequest"));
const DeactiveSellers = lazy(() =>
  import("../../views/admins/DeactiveSellers")
);
const ChatSeller = lazy(() => import("../../views/admins/ChatSeller"));
const SellerRequest = lazy(() => import("../../views/admins/SellerRequest"));
const SellerDetails = lazy(() => import("../../views/admins/SellerDetails"));
const AddBanner = lazy(() => import("../../views/sellers/AddBanner"));
const ProductsSeller = lazy(() => import("../../views/admins/ProductsSeller"));
const DetailCheckPayment = lazy(() =>
  import("../../views/admins/DetailCheckPayment")
);
const AdminWallet = lazy(() => import("../../views/admins/AdminWallet"));
const Coupon = lazy(() => import("../../views/admins/Coupon"));
const AdminDashboard = lazy(() => import("../../views/admins/AdminDashboard"));
export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },

  {
    path: "/admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/category",
    element: <Category />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/sellers",
    element: <Sellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers-request",
    element: <SellerRequest />,
    role: "admin",
  },
  {
    path: "admin/dashboard/seller/details/:sellerId",
    element: <SellerDetails />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/payment-request",
    element: <PaymentRequest />,
    role: "admin",
  },
  {
    path: "admin/dashboard/deactive-sellers",
    element: <DeactiveSellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/chat-sellers",
    element: <ChatSeller />,
    role: "admin",
  },
  {
    element: <ProductsSeller />,
    role: "admin",
    path: "/admin/dashboard/banner",
  },
  {
    element: <AddBanner />,
    role: "admin",
    path: "/admin/dashboard/:productId",
  },
  {
    element: <DetailCheckPayment />,
    role: "admin",
    path: "/detail_transation/:id",
  },
  {
    element: <AdminWallet />,
    role: "admin",
    path: "/admin_wallet",
  },
  {
    element: <Coupon />,
    role: "admin",
    path: "/coupon",
  },
];
