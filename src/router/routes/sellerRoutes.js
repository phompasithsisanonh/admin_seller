import { lazy } from "react";            
const Pending =  lazy(()=> import("../../Pending"));
const Destive  = lazy(()=> import("../../Destive"));
const SellerDashboard = lazy(()=> import('../../views/sellers/SellerDashboard'))   
const AddProduct = lazy(()=> import('../../views/sellers/AddProduct'))   
const Products = lazy(()=> import('../../views/sellers/Products')) 
const Orders = lazy(()=> import('../../views/sellers/Order')) 
const Payments = lazy(()=> import('../../views/sellers/Payments'))
const SellerToAdmin = lazy(()=> import('../../views/sellers/SellerToAdmin'))
const SellerToCustomer = lazy(()=> import('../../views/sellers/SellerToCustomer'))
const Profile = lazy(()=> import('../../views/sellers/Profile'))
const EditProduct = lazy(()=> import('../../views/sellers/EditProduct'))
export const sellerRoutes = [
    
    {
        path: '/seller/account-pending',
        element : <Pending/>,
        ability : 'seller' 
    },
     {
         path: '/seller/account-deactive',
         element : <Destive/>,
         ability : 'seller' 
     },

    
    {
        path: '/seller/dashboard',
        element : <SellerDashboard/>,
        role : 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/add-product',
        element : <AddProduct/>,
        role : 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/edit-product/:productId',
        element : <EditProduct/>,
        role : 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/products',
        element : <Products/>,
        role : 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/orders',
        element : <Orders/>,
        role : 'seller',
       status : 'active'
    },
    {
        path: '/seller/dashboard/payments',
        element : <Payments/>,
        role : 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/chat-support',
        element : <SellerToAdmin/>,
        role : 'seller',
        visibility : ['active','deactive','pending']
    },
    {
        path: '/seller/dashboard/chat-customer/:customerId',
        element : <SellerToCustomer/>,
        role : 'seller',
        status : 'active'
    },
    { 
        path: '/seller/dashboard/chat-customer',
        element : <SellerToCustomer/>,
        role : 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/profile',
        element : <Profile/>,
        role : 'seller',
        status : 'pending'
    },


]