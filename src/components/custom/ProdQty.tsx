"use client";

import { Button } from "@/components/ui/button";
import { CartActions } from "@/store/slice/cartSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function ProdQty() {
  const dispatch = useDispatch();
  const qty = useSelector((state: RootState) => state.cart.productQty);

  // const [qty, setQty] = useState(1);
  const [firstRender, setFirstRender] = useState(true);

  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 1 && newQty <= 10) {
      // setQty(newQty);
      dispatch(CartActions.updateQty(newQty));
      setFirstRender(false);
    } else {
      const errorMessage =
        newQty < 1
          ? "Quantity cannot be less than 1"
          : "Quantity cannot be more than 10";
      toast.error(errorMessage, {
        iconTheme: {
          primary: "#FFC300",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  if (firstRender) {
    dispatch(CartActions.resetQty());
  }

  return (
    <>
      <div className=" flex flex-col lg:flex-row lg:items-center text-base pt-4 md:pt-8 tracking-wide">
        <div className=" font-bold ">Quantity:</div>
        <div className=" flex items-center mt-2 lg:mt-0">
          <Button
            className=" bg-gray-200 rounded-full hover:bg-gray-200 text-gray-800 h-8 w-8 text-sm hover:ring-1 ring-gray-700 lg:ml-4 mr-4"
            onClick={() => handleQuantityChange(qty - 1)}
          >
            -
          </Button>
          <div>{qty}</div>
          <Button
            className=" bg-gray-200 rounded-full hover:bg-gray-200 text-gray-800 h-8 w-8 text-sm hover:ring-1 ring-gray-700 ml-4"
            onClick={() => handleQuantityChange(qty + 1)}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
}
