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
    increaseCartQuantity: (state, action) => {
      const itemPresent = state.cart.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    decreaseCartQuantity: (state, action) => {
      const itemPresent = state.cart.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        if (itemPresent.quantity == 1) {
          itemPresent.quantity = 0;
          const filteredCart = state.cart.filter((item) => item.id !== action.payload.id);
          state.cart = filteredCart;
        } else {
          itemPresent.quantity--;
        }
      }
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeItem, increaseCartQuantity, decreaseCartQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
