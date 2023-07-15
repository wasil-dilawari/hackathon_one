"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CartListing() {
  const myCart = useSelector((state: RootState) => state.cart.shoppingCart);
  const cartSize = useSelector((state: RootState) => state.cart.cartSize);
  //   let subTotal = 0;
  if (myCart.length < 1) {
    return (
      <div className=" flex flex-col items-center justify-center">
        <ShoppingBag className=" h-28 w-28" />
        <span className=" font-bold text-2xl text-center py-2">
          Your Shopping Bag is Empty
        </span>
      </div>
    );
  } else {
    // myCart.map((item) => (subTotal += item.productQty * item.productPrice));
    const subTotal = myCart.reduce((total, item) => {
      return total + item.productQty * item.productPrice;
    }, 0);

    return (
      <div className=" grid md:grid-cols-[70%,1fr] lg:px-20 md:gap-4">
        <div className=" flex flex-col gap-8 ">
          {myCart.map((item) => (
            <div
              key={item.productID}
              className=" grid grid-cols-[auto,auto,1fr] "
            >
              <div className=" md:h-40 md:w-40 flex justify-center items-center ">
                <Link href={`/product/${item.productID}`}>
                  <Image
                    src={item.productImage}
                    width={160}
                    height={160}
                    alt={item.productTitle}
                  />
                </Link>
              </div>
              <div className=" flex flex-col px-2 ">
                <Link href={`/product/${item.productID}`}>
                  <div className=" text-xl text-gray-700 font-light ">
                    {item.productTitle}
                  </div>
                </Link>
                <div className=" flex-1 mt-2 text-sm text-gray-500 font-semibold">
                  {item.productType}
                </div>
                <div className=" font-light text-sm">
                  Size: {item.productVariant}
                </div>
                <div className=" font-bold tracking-widest">
                  <span className=" font-light text-sm tracking-tight">
                    Item Price:
                  </span>{" "}
                  ${item.productPrice}
                </div>
              </div>
              <div className=" flex flex-col ">
                <div className=" flex justify-end items-start">
                  <Trash2 />
                </div>
                <div className=" flex justify-end items-end flex-1">
                  Qty: {item.productQty}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" mt-4 md:mt-0 p-2 bg-gray-100 flex flex-col gap-6">
          <div className=" p-2 font-bold ">Order Summary</div>
          <div className=" flex justify-between">
            <div className=" p-2 ">Quantity</div>
            <div className=" p-2 ">{cartSize}</div>
          </div>
          <div className=" flex justify-between">
            <div className=" p-2 ">Sub Total</div>
            <div className=" p-2 ">${subTotal}</div>
          </div>
          <div className=" flex justify-center">
            <Button className=" rounded-none px-6 py-6">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
