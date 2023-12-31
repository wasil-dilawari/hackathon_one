// drizzleCartMiddleware.ts

import { Middleware } from "@reduxjs/toolkit";
import { CartActions, shoppingItem } from "@/store/slice/cartSlice";

const apiUrl = process.env.NEXT_PUBLIC_CART_API_URL || "";

interface IDrizzleData {
  product_id: string;
  product_variant: string;
  product_qty: number;
  product_title: string;
  product_type: string;
  product_price: number;
  product_image: string;
}

function mapDrizzleDataToShoppingItem(
  drizzleData: IDrizzleData[] | null | undefined
): shoppingItem[] {
  if (!drizzleData || !Array.isArray(drizzleData)) {
    return [];
  }
  return drizzleData.map(function (item) {
    return {
      productID: item.product_id,
      productVariant: item.product_variant,
      productQty: item.product_qty,
      productTitle: item.product_title,
      productType: item.product_type,
      productPrice: item.product_price,
      productImage: item.product_image,
    };
  });
}

function mapShoppingItemToDrizzleData(
  shoppingData: shoppingItem[]
): IDrizzleData[] {
  return shoppingData.map(function (item) {
    return {
      product_id: item.productID,
      product_variant: item.productVariant,
      product_qty: item.productQty,
      product_title: item.productTitle,
      product_type: item.productType,
      product_price: item.productPrice,
      product_image: item.productImage,
    };
  });
}

const drizzleCartMiddleware: Middleware = function (store) {
  return function (next) {
    return async function (action) {
      if (action.type === "@@INIT") {
        try {
          const res = await fetch(apiUrl);
          if (res.ok) {
            const drizzleCartData: IDrizzleData[] = await res.json();
            const newItems: shoppingItem[] =
              mapDrizzleDataToShoppingItem(drizzleCartData);

            store.dispatch(CartActions.syncCart(newItems));
          } else {
            console.error("Failed to fetch Drizzle cart data:", res.status);
          }
        } catch (error) {
          console.log("Error fetching Drizzle cart data:", error);
        }
      }

      return next(action);
    };
  };
};

export default drizzleCartMiddleware;
