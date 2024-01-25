import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    user: UserSlice,
  },
});

export default store;
