import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;
