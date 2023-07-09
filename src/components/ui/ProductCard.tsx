import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import { FC } from "react";
import Link from "next/link";

interface Iproduct {
  _id: string;
  title: string;
  price: number;
  primaryImage: IImage;
  productType: { title: string };
}

const ProductCard: FC<{ product: Iproduct }> = async ({ product }) => {
  return (
    <>
      <Link href={`/product/${product._id}`}>
        <Image
          src={urlForImage(product.primaryImage).url()}
          alt={product.title}
          width={250}
          height={300}
        />
        <div className=" font-semibold mt-2">{product.title}</div>
        <div className=" font-semibold text-sm text-gray-500">
          {product.productType.title}
        </div>
        <div className=" font-bold text-xl mt-2 tracking-wider">
          ${product.price}
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
