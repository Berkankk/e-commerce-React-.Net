import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../Model/ICart";
import requests from "../../api/requests";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      return await requests.Cart.get();
    } catch (error) {
      return thunkAPI.rejectWithValue("Sepet yüklenemedi.");
    }
  }
);

export const addItemToCart = createAsyncThunk<
  Cart,
  { productId: number; quantity: number },
  { rejectValue: string }
>(
  "cart/addItem",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await requests.Cart.addItem(productId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue("Sepete ürün eklenemedi.");
    }
  }
);

export const deleteItemFromCart = createAsyncThunk<
  Cart,
  { productId: number; quantity: number },
  { rejectValue: string }
>(
  "cart/deleteItem",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await requests.Cart.deleteItem(productId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue("Sepetten ürün silinemedi.");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart | null>) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Sepet yüklenirken bir hata oluştu.";
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Sepete ürün eklenirken bir hata oluştu.";
      })
      .addCase(deleteItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Sepetten ürün silinirken bir hata oluştu.";
      });
  },
});

export const { setCart } = cartSlice.actions;