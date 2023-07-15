"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";
import { RootState } from "@/store/store";

interface IpassOnData {
  productID: string;
  productTitle: string;
  productType: string;
  productPrice: number;
  productImage: string;
}

export default function BtnAddToCart(data: IpassOnData) {
  // console.log(id._id);
  const dispatch = useDispatch();
  const variantCheck = useSelector(
    (state: RootState) => state.cart.productVariant
  );
  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: data.productID,
      }),
    });

    const result = await res.json();
    // console.log("Result: " + result);
  };

  const addItem = () => {
    // console.log(variantCheck);

    if (variantCheck === "") {
      toast.error("Please select Size");
    } else {
      dispatch(CartActions.addToCart(data));
      toast.success("Product Added to Cart");
    }
  };

  return (
    <Button className=" rounded-none px-4 py-6" onClick={addItem}>
      <ShoppingCart className=" mr-2" /> Add to Cart
    </Button>
  );
}
