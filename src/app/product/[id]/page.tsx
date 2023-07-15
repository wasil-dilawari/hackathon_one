import { client } from "../../../../sanity/lib/client";
import { Image as IImage } from "sanity";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import BtnAddToCart from "@/components/custom/BtnAddToCart";
import ProdVariants from "@/components/custom/ProdVariants";
import ProdQty from "@/components/custom/ProdQty";

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

interface IpassOnData {
  productID: string;
  productTitle: string;
  productType: string;
  productPrice: number;
  productImage: string;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data: Iproduct = await getProductData(params.id);
  const imgURL: string = urlForImage(data.primaryImage).url();
  const passOnData: IpassOnData = {
    productID: data._id,
    productTitle: data.title,
    productType: data.productType.title,
    productPrice: data.price,
    productImage: imgURL,
  };
  // console.log("-------->" + data[0].title + "<--------");

  // const handleAddToCart = async () => {
  //   const res = await fetch("/api/cart", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       product_id: data[0]._id,
  //     }),
  //   });

  //   const result = await res.json();
  //   console.log("Result: " + result);
  // };

  return (
    <section className=" flex flex-col bg-gray-50 py-20">
      <div className=" grid grid-cols-1 md:grid-cols-[70%,1fr] max-w-5xl ">
        <div className=" flex justify-end ">
          <Image src={imgURL} alt={data.title} height={400} width={600} />
        </div>
        <div className=" pt-8 lg:pt-14 px-4">
          <div className=" font-normal text-3xl ">{data.title}</div>
          <div className=" font-semibold text-2xl text-gray-400 ">
            {data.productType.title}
          </div>
          <ProdVariants sizes={data.sizes} />
          <ProdQty />
          <div className=" flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6 mt-8 ">
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
