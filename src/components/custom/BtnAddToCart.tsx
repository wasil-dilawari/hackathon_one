"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";
import { RootState } from "@/store/store";
import { useState } from "react";

interface IBtnDataReceived {
  productID: string;
  productTitle: string;
  productType: string;
  productPrice: number;
  productImage: string;
}

const apiUrl = process.env.NEXT_PUBLIC_CART_API_URL || "";

export default function BtnAddToCart(data: IBtnDataReceived) {
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useDispatch();
  const variantCheck = useSelector(
    (state: RootState) => state.cart.productVariant
  );
  const myCart = useSelector((state: RootState) => state.cart.shoppingCart);
  const qtyCheck = useSelector((state: RootState) => state.cart.productQty);

  const handleAddToCart = async () => {
    const existingCartItemIndex = myCart.findIndex(
      (item) =>
        item.productID === data.productID &&
        item.productVariant === variantCheck
    );
    if (isUpdating) {
      return;
    }

    if (existingCartItemIndex !== -1) {
      setIsUpdating(true);
      const existingCartItem = myCart[existingCartItemIndex];
      const newQty = existingCartItem.productQty + qtyCheck;

      try {
        const res = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: data.productID,
            product_variant: variantCheck,
            product_qty: newQty,
          }),
        });
        if (res.ok) {
          dispatch(
            CartActions.updateQtyInCart({
              itemIndex: existingCartItemIndex,
              newQty: newQty,
            })
          );
          toast.success("Product Quantity Updated in Cart");
        } else {
          toast.error("Failed to update product to cart");
        }
      } catch (error) {
        toast.error("Failed to update product quantity in cart");
      } finally {
        setIsUpdating(false);
      }
    } else {
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          body: JSON.stringify({
            product_id: data.productID,
            product_variant: variantCheck,
            product_qty: qtyCheck,
            product_title: data.productTitle,
            product_type: data.productType,
            product_price: data.productPrice,
            product_image: data.productImage,
          }),
        });

        const result = await res.json();
        if (res.ok) {
          dispatch(CartActions.addToCart(data));
          toast.success("Product Added to Cart");
        } else {
          toast.error("Failed to add product to cart");
        }
      } catch (error) {
        toast.error("Failed to add product to cart");
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const addItem = () => {
    if (variantCheck === "") {
      toast.error("Please select Size");
    } else {
      handleAddToCart();
    }
  };

  return (
    <Button
      className=" rounded-none px-4 py-6"
      onClick={addItem}
      disabled={isUpdating}
    >
      <ShoppingCart className=" mr-2" /> Add to Cart
    </Button>
  );
}
