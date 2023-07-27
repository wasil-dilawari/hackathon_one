"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { CartActions } from "@/store/slice/cartSlice";

const apiUrl = process.env.NEXT_PUBLIC_CART_API_URL || "";

export default function ButtonAddProduct(id: { _id: string }) {
  // console.log(id._id);
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    const res = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        product_id: id._id,
      }),
    });

    const result = await res.json();
    // console.log("Result: " + result);
  };
  const addItem = () => {
    dispatch(CartActions.addToCart({}));
  };

  return (
    <Button className=" rounded-none px-4 py-6" onClick={addItem}>
      <ShoppingCart className=" mr-2" /> Add to Cart
    </Button>
  );
}
