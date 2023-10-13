import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: JSON.parse(localStorage.getItem("cart")) ?? [],

  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },

    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
