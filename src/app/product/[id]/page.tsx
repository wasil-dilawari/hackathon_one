import { client } from "../../../../sanity/lib/client";
import { Image as IImage } from "sanity";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ButtonAddProduct from "@/components/ui/BtnProdPageAddProduct";

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

  return res;
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
  const data: Iproduct[] = await getProductData(params.id);
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
          <Image
            src={urlForImage(data[0].primaryImage).url()}
            alt={data[0].title}
            height={400}
            width={600}
          />
        </div>
        <div className=" pt-8 lg:pt-14 pl-4">
          <div className=" font-normal text-3xl ">{data[0].title}</div>
          <div className=" font-semibold text-2xl text-gray-400 ">
            {data[0].productType.title}
          </div>
          <div className=" font-bold text-base pt-4 md:pt-8 tracking-wide">
            SELECT SIZE
          </div>
          <div className=" flex gap-4 pt-2 md:pt-4">
            {data[0].sizes.map((size) => (
              <Button
                variant="outline"
                className=" rounded-full hover:shadow-xl hover:bg-white text-gray-500 font-bold"
                key={size}
              >
                {size}
              </Button>
            ))}
          </div>
          <div className=" flex items-center font-bold text-base pt-4 md:pt-8 tracking-wide">
            <div>Quantity:</div>
            <Input
              type="text"
              size={1}
              defaultValue={1}
              className=" font-light text-gray-500 border border-gray-400 rounded-none w-fit ml-2"
            />
          </div>
          <div className=" flex flex-col lg:flex-row lg:items-center gap-2 md:gap-6 mt-4 md:mt-8">
            <ButtonAddProduct _id={params.id} />{" "}
            <div className=" font-bold text-2xl ">${data[0].price}.00</div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-[30%,1fr] gap-10 mx-20 px-20 bg-white mt-20 pb-20">
        <div className=" col-span-2 py-10 border-b border-black flex flex-col justify-center">
          <div className=" font-bold text-2xl z-10 absolute">
            Product Information
          </div>
          <div className=" font-bold text-8xl text-gray-100 ">Overview</div>
        </div>
        <div className=" font-bold text-gray-500 text-base">
          PRODUCT DETAILS
        </div>
        <div className=" font-light text-justify tracking-wider ">
          {data[0].details}
        </div>
        <div className=" font-bold text-gray-500 text-base">PRODUCT CARE</div>
        <div className=" font-light text-justify tracking-wider ">
          {data[0].careInstructions}
        </div>
      </div>
    </section>
  );
}
