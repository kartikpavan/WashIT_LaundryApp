import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cart: [],
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const itemPresent = state.cart.find((item) => item.id === action.payload.id);
         if (itemPresent) {
            itemPresent.quantity++;
         } else {
            state.cart.push({ ...action.payload, quantity: 1 });
         }
      },
      removeItem: (state, action) => {
         const filteredCart = state.cart.filter((item) => item.id !== action.payload.id);
         state.cart = filteredCart;
      },
      increaseQuantity: (state, action) => {
         const itemPresent = state.cart.find((item) => item.id === action.payload.id);
         if (itemPresent) {
            itemPresent.quantity++;
         }
      },
      decreaseQuantity: (state, action) => {
         const itemPresent = state.cart.find((item) => item.id === action.payload.id);
         if (itemPresent) {
            if (itemPresent.quantity == 1) {
               itemPresent.quantity = 0;
               const filteredCart = state.cart.filter((item) => item.id !== action.payload.id);
               state.cart = filteredCart;
            } else {
               item.itemPresent--;
            }
         }
      },
   },
});

export const { addToCart, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
