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
  // productVariant: string;
  // productQty: number;
  productTitle: string;
  productType: string;
  productPrice: number;
  productImage: string;
}

export default function BtnAddToCart(data: IBtnDataReceived) {
  // console.log(id._id);
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

    // console.log("Existing Item Index: " + existingCartItemIndex);
    // console.log("data.productID: " + data.productID);
    // console.log("data.productVariant: " + variantCheck);

    if (existingCartItemIndex !== -1) {
      setIsUpdating(true);
      // If the product with the same product_id and product_variant exists,
      // update the quantity by adding to the existing quantity
      const existingCartItem = myCart[existingCartItemIndex];
      const newQty = existingCartItem.productQty + qtyCheck;
      // console.log("New Quantity: " + newQty);

      try {
        await fetch("/api/cart", {
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

        // Update the quantity in the Redux store
        dispatch(
          CartActions.updateQtyInCart({
            itemIndex: existingCartItemIndex,
            newQty: newQty,
          })
        );

        toast.success("Product Quantity Updated in Cart");
      } catch (error) {
        toast.error("Failed to update product quantity in cart");
      }
    } else {
      // If the product with the same product_id and product_variant does not exist,
      // add it as a new item
      try {
        const res = await fetch("/api/cart", {
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

    // --------------------------------------------
    // const res = await fetch("/api/cart", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     product_id: data.productID,
    //     product_variant: variantCheck,
    //     product_qty: qtyCheck,
    //     product_title: data.productTitle,
    //     product_type: data.productType,
    //     product_price: data.productPrice,
    //     product_image: data.productImage,
    //   }),
    // });

    // const result = await res.json();
    // if (res.ok) {
    //   dispatch(CartActions.addToCart(data));
    //   toast.success("Product Added to Cart");
    // } else {
    //   toast.error("Failed to add product to cart");
    // }
    //-------------------------------------------
  };

  const addItem = () => {
    // console.log(variantCheck);

    if (variantCheck === "") {
      toast.error("Please select Size");
    } else {
      handleAddToCart();
      // dispatch(CartActions.addToCart(data));
      // toast.success("Product Added to Cart");
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
