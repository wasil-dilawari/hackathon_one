"use client";

import { Button } from "@/components/ui/button";
import { CartActions } from "@/store/slice/cartSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProdVariants(props: { sizes: string[] }) {
  const dispatch = useDispatch();
  const [firstRender, setfirstRender] = useState(true);
  if (firstRender) {
    dispatch(CartActions.clearVariant());
  }
  const productVariant = useSelector(
    (state: RootState) => state.cart.productVariant
  );

  const selectVariant = (size: string) => {
    setfirstRender(false);
    dispatch(CartActions.selectVariant({ productVariant: size }));
    // toast.success("Product Added to Cart");
  };

  return (
    <>
      <div className=" font-bold text-base pt-4 md:pt-8 tracking-wide">
        SELECT SIZE
      </div>
      <div className=" flex gap-4 pt-2 md:pt-4">
        {props.sizes.map((size) => (
          <Button
            // variant="outline"
            className={
              size === productVariant
                ? " bg-gray-700 text-white rounded-full hover:bg-bg-gray-700 font-bold h-8 w-8 text-sm"
                : " bg-gray-50 rounded-full hover:shadow-md hover:bg-white text-gray-500 font-bold h-8 w-8 text-sm"
            }
            key={size}
            onClick={() => selectVariant(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </>
  );
}
