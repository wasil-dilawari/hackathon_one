"use client";

import getStripePromise from "@/lib/stripe";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { shoppingItem } from "@/store/slice/cartSlice";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function BtnCheckout() {
  const dispatch = useDispatch();

  const myCart: shoppingItem[] = useSelector(
    (state: RootState) => state.cart.shoppingCart
  );

  async function handleCheckout() {
    const stripe = await getStripePromise();

    const response = await fetch("api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(myCart),
    });

    const data = await response.json();
    if (data.session) {
      toast.loading("Redirecting...");
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  }

  return (
    <Button className=" rounded-none px-6 py-6 " onClick={handleCheckout}>
      Proceed to Checkout <Lock className=" h-5 w-5 ml-2" />
    </Button>
  );
}
