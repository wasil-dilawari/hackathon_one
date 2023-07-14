"use client";

import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function IconHeaderCart() {
  const cartQty = useSelector((state: RootState) => state.cart.cartSize);

  return (
    <div className=" flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full relative">
      {cartQty != 0 ? (
        <span className=" absolute -right-2 -top-2 rounded-full bg-red-500 w-5 h-5 flex justify-center items-center text-white text-xs">
          {cartQty}
        </span>
      ) : (
        <span></span>
      )}
      <ShoppingCart className=" h-6 w-6 text-gray-700" />
    </div>
  );
}
