import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../Pages/counter/counterSlice";
import { cartSlice } from "../Pages/Cart/cartSlice";


export const store = configureStore({
    reducer:{
        counter: counterSlice.reducer,
        cart : cartSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch