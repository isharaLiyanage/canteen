"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { persistReducer } from "redux-persist";
interface Product {
  id: string;
  name: string;
  desc: string;
  image: string[];
  category: string;
  price: number;
  star: number | null;
  tag: string[];
}

// Define the type for the items in the cart
interface CartItem {
  product: Product;
  quantity: number;
}
// Define a type for the slice state
interface CartState {
  items: CartItem[];
}

// Define the initial state using that type
const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",

  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const hasItems = state.items.find(
        (item) => item.product.id == action.payload.product.id
      );
      if (hasItems) {
        hasItems.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    removeAll: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, removeAll } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
