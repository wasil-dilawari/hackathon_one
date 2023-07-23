"use client";

import { CheckCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { CartActions } from "@/store/slice/cartSlice";
import { mutate } from "swr";
import toast from "react-hot-toast";

import React from "react";

export default function SuccessPage() {
  const dispatch = useDispatch();
  const apiUrl = "/api/cart";

  (async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({
          product_id: "xxxxdeleteallproductsforthisuserxxxx",
        }),
      });

      if (res.ok) {
        dispatch(CartActions.clearCart());
        mutate(apiUrl);
      } else {
        toast.error("Failed to Empty Cart");
      }
    } catch (error) {
      console.error("Error emptying cart:", error);
      toast.error("Failed to Empty Cart");
    }
  })();
  return (
    <section className="  bg-gray-50 py-10 px-10">
      <div className=" ">
        <div className=" font-bold text-2xl pb-10">Shopping Cart</div>
        <div className=" flex flex-col items-center justify-center">
          <CheckCircle2 className=" h-28 w-28 text-[green]" />
          <div className=" font-bold text-2xl text-center py-2">
            Order Placed Successfully
          </div>
          <div>Thank You for shopping with us.</div>
        </div>
      </div>
    </section>
  );
}
