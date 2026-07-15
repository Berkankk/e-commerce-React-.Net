import { configureStore } from "@reduxjs/toolkit";

import { counterSlice } from "../Pages/counter/counterSlice";
import { cartSlice } from "../Pages/Cart/cartSlice";
import { accountSlice } from "../Pages/Account/AccountSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;