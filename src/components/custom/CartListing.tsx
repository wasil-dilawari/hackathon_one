"use client";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { CartActions } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";

export default function CartListing() {
  const dispatch = useDispatch();

  const myCart = useSelector((state: RootState) => state.cart.shoppingCart);
  const cartSize = useSelector((state: RootState) => state.cart.cartSize);

  const handleDeleteItem = (productID: string, productVariant: string) => {
    dispatch(
      CartActions.removeFromCart({
        productID: productID,
        productVariant: productVariant,
      })
    );
  };

  const handleQuantityChange = (itemIndex: number, newQty: number) => {
    if (newQty >= 1 && newQty <= 10) {
      dispatch(
        CartActions.updateQtyInCart({
          itemIndex: itemIndex,
          newQty: newQty,
        })
      );
      updateTotalQuantity();
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

  const updateTotalQuantity = () => {
    // const totalQty = myCart.reduce((total, item) => total + item.productQty, 0);
    dispatch(CartActions.updateTotalQuantity());
  };

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
          {myCart.map((item, index) => (
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
                  <Button
                    className=" bg-gray-50 rounded-full hover:shadow-md hover:bg-white h-8 w-8 px-1 py-1"
                    onClick={() =>
                      handleDeleteItem(item.productID, item.productVariant)
                    }
                  >
                    <Trash2 className=" h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                <div className=" flex justify-end items-end flex-1 gap-x-1">
                  <Button
                    className=" bg-gray-200 rounded-full hover:bg-gray-200 text-gray-800 h-8 w-8 text-sm hover:ring-1 ring-gray-700 lg:ml-4 mr-4"
                    onClick={() =>
                      handleQuantityChange(index, item.productQty - 1)
                    }
                  >
                    -
                  </Button>
                  <div>{item.productQty}</div>
                  <Button
                    className=" bg-gray-200 rounded-full hover:bg-gray-200 text-gray-800 h-8 w-8 text-sm hover:ring-1 ring-gray-700 lg:ml-4 mr-4"
                    onClick={() =>
                      handleQuantityChange(index, item.productQty + 1)
                    }
                  >
                    +
                  </Button>
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
            <div className=" p-2 ">${subTotal.toLocaleString()}</div>
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
