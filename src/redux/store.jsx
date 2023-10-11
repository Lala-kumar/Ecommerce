import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },

  //This line enables the Redux DevTools Extension in your application.
  devTools: true,
});
