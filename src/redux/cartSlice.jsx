import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: JSON.parse(localStorage.getItem("cart")) ?? [],

  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...newItem });
      }
    },

    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;