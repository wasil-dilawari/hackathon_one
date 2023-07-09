import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  productIDs: Array<string>;
  totalAmount: number;
  totalQty: number;
}

export interface PayloadData {
  _id: string;
  qty: number;
}

const initialState: CartState = {
  productIDs: [],
  totalAmount: 0,
  totalQty: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions: PayloadAction<PayloadData>) => {
      state.totalQty += actions.payload.qty;
    },
    removeFromCart: (state, actions: PayloadAction<PayloadData>) => {
      state.totalQty -= actions.payload.qty;
    },
    clearCart: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const CartActions = cartSlice.actions;

export default cartSlice.reducer;
