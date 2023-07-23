"use client";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { CartActions } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";
import BtnCheckout from "./BtnCheckout";
import useSWR, { mutate } from "swr";
import { useDrizzleData } from "./useDrizzleData";
import { useState } from "react";

export interface IDrizzleData {
  createdAt: string;
  id: number;
  product_id: string;
  product_image: string;
  product_price: number;
  product_qty: number;
  product_title: string;
  product_type: string;
  product_variant: string;
  updatedAt: null;
  user_id: string;
}

export default function CartListingDrizzle() {
  const apiUrl = "/api/cart";
  const { MyDrizzleCart, DrizzleError } = useDrizzleData();
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

  const dispatch = useDispatch();

  const myCart = useSelector((state: RootState) => state.cart.shoppingCart);
  const cartSize = useSelector((state: RootState) => state.cart.cartSize);

  const handleDeleteItem = async (
    productID: string,
    productVariant: string
  ) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({
        product_id: productID,
        product_variant: productVariant,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      dispatch(
        CartActions.removeFromCart({
          productID: productID,
          productVariant: productVariant,
        })
      );
      mutate(apiUrl);
      toast.success("Item Deleted");
    } else {
      toast.error("Failed to Delete Product");
    }
  };

  const handleQuantityChange = async (
    productID: string,
    productVariant: string,
    newQty: number
  ) => {
    if (isUpdatingQuantity) {
      return;
    }
    if (newQty >= 1 && newQty <= 10) {
      setIsUpdatingQuantity(true);
      try {
        await fetch("/api/cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: productID,
            product_variant: productVariant,
            product_qty: newQty,
          }),
        });
        mutate(apiUrl);
        dispatch(
          CartActions.updateQtyInDrizzleCart({
            productID: productID,
            productVariant: productVariant,
            newQty: newQty,
          })
        );
        updateTotalQuantity();
      } catch (error) {
        console.log(error);
        toast.error("Failed to update quantity.", {
          iconTheme: {
            primary: "#FF0000",
            secondary: "#FFFAEE",
          },
        });
      } finally {
        setIsUpdatingQuantity(false);
      }
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

  if (DrizzleError) {
    return <div>Error loading data</div>;
  } else if (!MyDrizzleCart) {
    return <div>Loading...</div>;
  } else if (MyDrizzleCart.length < 1) {
    // console.log("MyDrizzleCar.length < 1");

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
          {MyDrizzleCart.map((item, index) => (
            <div
              key={`${item.product_id}-${item.product_variant}`}
              className=" grid grid-cols-[auto,auto,1fr] "
            >
              <div className=" md:h-40 md:w-40 flex justify-center items-center ">
                <Link href={`/product/${item.product_id}`}>
                  <Image
                    src={item.product_image}
                    width={160}
                    height={160}
                    alt={item.product_title}
                  />
                </Link>
              </div>
              <div className=" flex flex-col px-2 ">
                <Link href={`/product/${item.product_id}`}>
                  <div className=" text-xl text-gray-700 font-light ">
                    {item.product_title}
                  </div>
                </Link>
                <div className=" flex-1 mt-2 text-sm text-gray-500 font-semibold">
                  {item.product_type}
                </div>
                <div className=" font-light text-sm">
                  Size: {item.product_variant}
                </div>
                <div className=" font-bold tracking-widest">
                  <span className=" font-light text-sm tracking-tight">
                    Item Price:
                  </span>{" "}
                  ${item.product_price}
                </div>
              </div>
              <div className=" flex flex-col ">
                <div className=" flex justify-end items-start">
                  <Button
                    className=" bg-gray-50 rounded-full hover:shadow-md hover:bg-white h-8 w-8 px-1 py-1"
                    onClick={() =>
                      handleDeleteItem(item.product_id, item.product_variant)
                    }
                  >
                    <Trash2 className=" h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                <div className=" flex justify-end items-end flex-1 gap-x-1">
                  <Button
                    className=" bg-gray-200 rounded-full hover:bg-gray-200 text-gray-800 h-8 w-8 text-sm hover:ring-1 ring-gray-700 "
                    onClick={() =>
                      handleQuantityChange(
                        item.product_id,
                        item.product_variant,
                        item.product_qty - 1
                      )
                    }
                    disabled={isUpdatingQuantity}
                  >
                    -
                  </Button>
                  <div className=" mx-2">{item.product_qty}</div>
                  <Button
                    className=" bg-gray-200 rounded-full hover:bg-gray-200 text-gray-800 h-8 w-8 text-sm hover:ring-1 ring-gray-700 "
                    onClick={() =>
                      handleQuantityChange(
                        item.product_id,
                        item.product_variant,
                        item.product_qty + 1
                      )
                    }
                    disabled={isUpdatingQuantity}
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
            <BtnCheckout />
            {/* <Button className=" rounded-none px-6 py-6">
              Proceed to Checkout
            </Button> */}
          </div>
        </div>
      </div>
    );
  }
}

const GetDrizzleCart = () => {
  const apiUrl = "/api/cart";
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: MyDrizzleCart, error: DrizzleError } = useSWR(apiUrl, fetcher);

  // console.log("MyDrizzleCart Data: " + MyDrizzleCart);

  if (DrizzleError) {
    return <div>Error loading data</div>;
  }

  if (!MyDrizzleCart) {
    return <div>Loading...</div>;
  }
};
