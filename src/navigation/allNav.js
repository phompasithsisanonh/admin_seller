import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiSolidCoupon } from "react-icons/bi";
import {FaUsers, FaWallet } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoIosChatbubbles } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { MdViewList } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { IoChatbubbles } from "react-icons/io5";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { HiClipboardDocumentList } from "react-icons/hi2"
export const allNav = [
  {
    id: 1,
    title: "ໜ້າຫຼັກ",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 18,
    title: "ລາຍການສິນຄ້າຜູ້ຂາຍ",
    icon:  <HiClipboardDocumentList />,
    role: "admin",
    path: "/admin/dashboard/banner",
  },
  {
    id: 2,
    title: "ຄຳສັ່ງຊື້",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "ໝວດສິນຄ້າ",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "ຈັດການຜູ້ຂາຍ",
    icon: <FaUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "ອານຸມັດວົງເງິນ",
    icon: <MdPayment />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 7,
    title: "ອານຸຍາດຜູ້ຂາຍ",
    icon: <FaCodePullRequest />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
  {
    id: 8,
    title: "Live Chat",
    icon: <IoIosChatbubbles />,
    role: "admin",
    path: "/admin/dashboard/chat-sellers",
  },









  {
    id: 9,
    title: "ໜ້າຫຼັກ",
    icon: <AiOutlineDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 10,
    title: "ເພີ່ມສິນຄ້າ",
    icon: <IoMdAdd />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 11,
    title: "ສິນຄ້າທັງໝົດ",
    icon: <MdViewList />,
    role: "seller",
    path: "/seller/dashboard/products",
  },
  // {
  //   id: 12,
  //   title: "ສິນຄ້າສ່ວນຫຼຸດ",
  //   icon: <TbBasketDiscount />,
  //   role: "seller",
  //   path: "/seller/dashboard/discount-product",
  // },
  {
    id: 13,
    title: "ອໍເດີ",
    icon: <BsCartCheck />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 14,
    title: "ທຸລະກຳ",
    icon: <MdPayment />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: 15,
    title: "ຕິດຕໍ່ລູກຄ້າ",
    icon: <IoChatbubbles />,
    role: "seller",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: 16,
    title: "ຕິດຕໍ່ຜູ້ສະໜັບສະໜູນ",
    icon: <BsFillChatQuoteFill />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
  {
    id: 17,
    title: "ໂປຣໄຟລ",
    icon: <CgProfile />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
  {
    id: 18,
    title: "ລາຍໄດ້ລະບົບ",
    icon: <FaWallet />,
    role: "admin",
    path: "/admin_wallet",
  },
  {
    id: 19,
    title: "ເພີ່ມ coupon",
    icon: <BiSolidCoupon />,
    role: "admin",
    path: "/coupon",
  },
];
