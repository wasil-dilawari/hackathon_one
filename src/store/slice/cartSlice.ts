import { IDrizzleData } from "@/components/custom/CartListingDrizzle";
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

export interface CartUpdatePayloadData {
  itemIndex: number;
  newQty: number;
}

export interface DrizzleCartUpdatePayloadData {
  productID: string;
  productVariant: string;
  newQty: number;
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
      if (
        actions.payload.productID &&
        actions.payload.productTitle &&
        actions.payload.productType &&
        actions.payload.productPrice &&
        actions.payload.productImage
      ) {
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
      const { productID, productVariant } = actions.payload;

      if (productID && productVariant) {
        const itemIndex = state.shoppingCart.findIndex(
          (item) =>
            item.productID === productID &&
            item.productVariant === productVariant
        );

        if (itemIndex !== -1) {
          const removedItem = state.shoppingCart[itemIndex];
          state.cartSize -= removedItem.productQty;
          state.shoppingCart.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state = initialState;
      console.log("Cart Cleared");
    },
    setCart: (state, actions: PayloadAction<IDrizzleData[]>) => {
      const newItems = actions.payload.map((item) => ({
        productID: item.product_id,
        productVariant: item.product_variant,
        productQty: item.product_qty,
        productTitle: item.product_title,
        productType: item.product_type,
        productPrice: item.product_price,
        productImage: item.product_image,
      }));

      state.shoppingCart = newItems;
      state.cartSize = state.shoppingCart.reduce(
        (total, item) => total + item.productQty,
        0
      );
    },
    syncCart: (state, actions: PayloadAction<shoppingItem[]>) => {
      state.shoppingCart = actions.payload;
      state.cartSize = actions.payload.reduce(
        (total, item) => total + item.productQty,
        0
      );
    },
    clearVariant: (state) => {
      state.productVariant = "";
    },
    selectVariant: (state, actions: PayloadAction<PayloadData>) => {
      if (actions.payload.productVariant) {
        state.productVariant = actions.payload.productVariant;
      }
    },
    updateQty: (state, actions: PayloadAction<number>) => {
      state.productQty = actions.payload;
    },
    updateQtyInCart: (state, action: PayloadAction<CartUpdatePayloadData>) => {
      const { itemIndex, newQty } = action.payload;
      if (itemIndex >= 0 && itemIndex < state.shoppingCart.length) {
        state.shoppingCart[itemIndex].productQty = newQty;
      }
      state.cartSize = state.shoppingCart.reduce(
        (total, item) => total + item.productQty,
        0
      );
    },
    updateQtyInDrizzleCart: (
      state,
      action: PayloadAction<DrizzleCartUpdatePayloadData>
    ) => {
      const { productID, productVariant, newQty } = action.payload;
      const cartItemIndex = state.shoppingCart.findIndex(
        (item) =>
          item.productID === productID && item.productVariant === productVariant
      );

      if (cartItemIndex !== -1) {
        state.shoppingCart[cartItemIndex].productQty = newQty;
        state.cartSize = state.shoppingCart.reduce(
          (total, item) => total + item.productQty,
          0
        );
      }
    },
    updateTotalQuantity: (state) => {
      state.cartSize = state.shoppingCart.reduce(
        (total, item) => total + item.productQty,
        0
      );
    },
    resetQty: (state) => {
      state.productQty = 1;
    },
  },
});

export const CartActions = cartSlice.actions;

export default cartSlice.reducer;
