"use client";

import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import { FC } from "react";
import Link from "next/link";

interface Iproduct {
  _id: string;
  title: string;
  price: number;
  primaryImage: IImage;
  productType: string;
}

const ProductCard: FC<{ product: any }> = async ({ product }) => {
  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: product._id,
      }),
    });

    const result = await res.json();
    // console.log(result);
  };

  return (
    <>
      <Link href={`product/${product._id}`}>
        <Image
          src={urlForImage(product.primaryImage).url()}
          alt={product.title}
          width={200}
          height={300}
        />
        <div className="text-center">{product.title}</div>
        <div className="text-center">${product.price}</div>
      </Link>
      <div className=" flex justify-center">
        <button
          className=" bg-slate-300 rounded-full px-3 py-1"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductCard;
