"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { CartActions } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";

export default function BtnAddToCart(id: { _id: string }) {
  // console.log(id._id);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: id._id,
      }),
    });

    const result = await res.json();
    // console.log("Result: " + result);
  };

  const addItem = () => {
    dispatch(CartActions.addToCart({ _id: "1", qty: 1 }));
    toast.success("Product Added to Cart");
  };

  return (
    <Button className=" rounded-none px-4 py-6" onClick={addItem}>
      <ShoppingCart className=" mr-2" /> Add to Cart
    </Button>
  );
}
