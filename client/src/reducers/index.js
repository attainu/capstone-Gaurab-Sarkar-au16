import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productsReducers from "./productsReducers";

export default combineReducers({
  auth: authReducer,
  products: productsReducers,
})