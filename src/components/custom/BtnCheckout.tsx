"use client";

import getStripePromise from "@/lib/stripe";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { shoppingItem } from "@/store/slice/cartSlice";
import { ExternalLink } from "lucide-react";

export default function BtnCheckout() {
  const dispatch = useDispatch();

  const myCart: shoppingItem[] = useSelector(
    (state: RootState) => state.cart.shoppingCart
  );

  async function handleCheckout() {
    const stripe = await getStripePromise();
    // const products: IStripeProductData[] = [
    //   {
    //     productID: "1",
    //     productTitle: "Product 1",
    //     productVariant: "S",
    //     productQty: 2,
    //     productPrice: 100,
    //   },
    //   {
    //     productID: "2",
    //     productTitle: "Product 2",
    //     productVariant: "L",
    //     productQty: 1,
    //     productPrice: 200,
    //   },
    //   {
    //     productID: "3",
    //     productTitle: "Product 3",
    //     productVariant: "XL",
    //     productQty: 3,
    //     productPrice: 300,
    //   },
    // ];

    const response = await fetch("api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(myCart),
    });

    const data = await response.json();
    if (data.session) {
      const checkoutURL = data.session.url;
      // stripe?.redirectToCheckout({ sessionId: data.session.id });
      window.open(checkoutURL, "_blank");
    }
  }

  return (
    <Button className=" rounded-none px-6 py-6 " onClick={handleCheckout}>
      Proceed to Checkout <ExternalLink className=" h-5 w-5 ml-2" />
    </Button>
  );
}
