"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { CartActions } from "@/store/slice/cartSlice";
import React from "react";

export default function CounterView() {
  const dispatch = useDispatch();

  const counterValue = useSelector((state: RootState) => state.cart.totalQty);

  const incr = () => {
    dispatch(CartActions.addToCart);
  };
  const decr = () => {
    dispatch(CartActions.removeFromCart);
  };

  return (
    <div>
      <div className=" py-4">Counter Value: {counterValue}</div>
      <div className=" py-4 flex gap-6">
        <button className=" px-3 py-1 rounded-full bg-green-300" onClick={incr}>
          +
        </button>
        <button className=" px-3 py-1 rounded-full bg-red-300" onClick={decr}>
          -
        </button>
      </div>
    </div>
  );
}
