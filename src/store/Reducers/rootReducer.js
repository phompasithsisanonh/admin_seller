import authReducer from "./authReducer";
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import sellerReducer from "./sellerReducer";
import  chatReducer  from "./chatReducer";
import  couponReducer  from "./couponReducer";
import  walletReducer  from "./walletReducer";
import  download  from "./download";
const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  chat:chatReducer,
  coupon:couponReducer,
  wallet:walletReducer,
  download:download
});
export default rootReducer;
