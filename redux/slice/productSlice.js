import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   product: [],
};

const productSlice = createSlice({
   name: "product",
   initialState,
   reducers: {
      getProducts: (state, action) => {
         state.product.push(action.payload);
      },
      increaseQuantity: (state, action) => {
         const itemPresent = state.product.find((item) => item.id === action.payload.id);
         if (itemPresent) {
            itemPresent.quantity++;
         }
      },
      decreaseQuantity: (state, action) => {
         const itemPresent = state.product.find((item) => item.id === action.payload.id);
         if (itemPresent) {
            if (itemPresent.quantity == 1) {
               itemPresent.quantity = 0;
               const filteredProducts = state.product.filter(
                  (item) => item.id !== action.payload.id
               );
               state.product = filteredProducts;
            } else {
               itemPresent.quantity--;
            }
         }
      },
   },
});

export const { getProducts, increaseQuantity, decreaseQuantity } = productSlice.actions;

export default productSlice.reducer;
