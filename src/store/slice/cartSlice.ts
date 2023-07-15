import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  productID: string;
  productVariant: string;
  productQty: number;
  cartSize: number;
  shoppingCart: shoppingItem[];
}

export interface shoppingItem {
  productID: string;
  productVariant: string;
  productQty: number;
  productTitle: string;
  productType: string;
  productPrice: number;
  productImage: string;
}

export interface PayloadData {
  productID?: string;
  productVariant?: string;
  productQty?: number;
  productTitle?: string;
  productType?: string;
  productPrice?: number;
  productImage?: string;
}

const initialState: CartState = {
  productID: "",
  productVariant: "",
  productQty: 1,
  cartSize: 0,
  shoppingCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions: PayloadAction<PayloadData>) => {
      // console.log(actions.payload);
      // console.log(actions.payload.productID);
      if (
        actions.payload.productID &&
        actions.payload.productTitle &&
        actions.payload.productType &&
        actions.payload.productPrice &&
        actions.payload.productImage
      ) {
        // console.log(actions.payload);
        state.cartSize += state.productQty;
        const existingItemIndex = state.shoppingCart.findIndex(
          (item) =>
            item.productID === actions.payload.productID &&
            item.productVariant === state.productVariant
        );
        if (existingItemIndex !== -1) {
          state.shoppingCart[existingItemIndex].productQty += state.productQty;
        } else {
          state.shoppingCart.push({
            productID: actions.payload.productID,
            productVariant: state.productVariant,
            productQty: state.productQty,
            productTitle: actions.payload.productTitle,
            productType: actions.payload.productType,
            productPrice: actions.payload.productPrice,
            productImage: actions.payload.productImage,
          });
        }
      }
    },
    removeFromCart: (state, actions: PayloadAction<PayloadData>) => {
      if (actions.payload.productQty) {
        state.cartSize -= actions.payload.productQty;
      }
    },
    clearCart: (state) => {
      state = initialState;
    },
    clearVariant: (state) => {
      state.productVariant = "";
    },
    selectVariant: (state, actions: PayloadAction<PayloadData>) => {
      if (actions.payload.productVariant) {
        state.productVariant = actions.payload.productVariant;
      }
    },
    increaseQty: (state) => {
      state.productQty++;
    },
    decreaseQty: (state) => {
      state.productQty--;
    },
    resetQty: (state) => {
      state.productQty = 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const CartActions = cartSlice.actions;

export default cartSlice.reducer;
