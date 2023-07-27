/* Dynamically created Product Page based on Product ID */

import { client } from "../../../../sanity/lib/client";
import { Image as IImage } from "sanity";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import BtnAddToCart from "@/components/custom/BtnAddToCart";
import ProdVariants from "@/components/custom/ProdVariants";
import ProdQty from "@/components/custom/ProdQty";

/* getProductData function to retrieve Products from Sanity for a Product ID passed as params */

async function getProductData(id: string) {
  var res = await client.fetch(
    `*[_type == "product" && _id == "${id}"]
      {
        _id,
        title,
        primaryImage,
        productType -> {title},
        careInstructions,
        sizes,
        price,
        details 
      }`
  );

  return res[0];
}

interface Iproduct {
  _id: string;
  title: string;
  price: number;
  primaryImage: IImage;
  productType: { title: string };
  careInstructions: string;
  sizes: string[];
  details: string;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data: Iproduct = await getProductData(params.id);
  const imgURL: string = urlForImage(data.primaryImage).url();

  return (
    <section className=" flex flex-col bg-gray-50 py-20">
      {/* Two Column Grid for Product Display */}
      <div className=" grid grid-cols-1 md:grid-cols-[70%,1fr] max-w-5xl ">
        {/* Left Side Column */}
        <div className=" flex justify-end ">
          <Image src={imgURL} alt={data.title} height={400} width={600} />
        </div>
        {/* Right Side Column */}
        <div className=" pt-8 lg:pt-14 px-4">
          <div className=" font-normal text-3xl ">{data.title}</div>
          <div className=" font-semibold text-2xl text-gray-400 ">
            {data.productType.title}
          </div>
          {/* Product Variant component for selection of Variant */}
          <ProdVariants sizes={data.sizes} />
          {/* Product Quantity component for selection of Quantity */}
          <ProdQty />
          <div className=" flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6 mt-8 ">
            {/* Add to Cart Button component with product details passed on */}
            <BtnAddToCart
              productID={data._id}
              productTitle={data.title}
              productType={data.productType.title}
              productPrice={data.price}
              productImage={imgURL}
            />
            <div className=" font-bold text-2xl lg:ml-4 ">
              ${data.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      {/* Second Section of Product Details with Product Information and Care Instructions */}
      <div className=" grid grid-cols-1 md:grid-cols-[30%,1fr] gap-10 md:mx-20 px-8 md:px-20 bg-white mt-20 pb-20">
        <div className=" md:col-span-2 py-10 border-b border-black flex flex-col justify-center">
          <div className=" font-bold text-2xl z-10 absolute">
            Product Information
          </div>
          <div className=" font-bold text-6xl md:text-8xl text-gray-100 ">
            Overview
          </div>
        </div>
        <div className=" font-bold text-gray-500 text-base">
          PRODUCT DETAILS
        </div>
        <div className=" font-light text-justify tracking-wider ">
          {data.details}
        </div>
        <div className=" font-bold text-gray-500 text-base">PRODUCT CARE</div>
        <div className=" font-light text-justify tracking-wider ">
          {data.careInstructions}
        </div>
      </div>
    </section>
  );
}
