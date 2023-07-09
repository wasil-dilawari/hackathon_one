import Image from "next/image";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";

import { Image as IImage } from "sanity";
import Link from "next/link";

interface Iproduct {
  _id: string;
  title: string;
  price: number;
  primaryImage: IImage;
}

export default async function Products() {
  const data: Iproduct[] = await getProductData();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className=" px-10 mt-20 ">
      <div className=" flex flex-col items-center gap-4">
        <div className=" text-blue-600 font-semibold text-xs tracking-wider text-center">
          PRODUCTS
        </div>
        <h2 className="text-3xl font-bold text-center">Check What We Have</h2>
        <div className=" flex flex-col gap-8 md:gap-0 md:flex-row justify-center items-start">
          {data.map((product: Iproduct) => (
            <div
              key={product._id}
              className=" lg:transition lg:ease-in-out lg:hover:scale-110 lg:duration-300"
            >
              <Link href={`/product/${product._id}`}>
                <div>
                  <Image
                    src={urlForImage(product.primaryImage).url()}
                    alt={product.title}
                    width={300}
                    height={400}
                  />
                </div>
                <h2 className=" font-semibold text-lg mt-1 md:mt-4">
                  {product.title}
                </h2>
                <p className=" font-semibold text-lg ">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function getProductData() {
  var res = await client.fetch(
    `*[_type == "product" && featured]
        {
          _id,
          title,
          price,
          primaryImage
        }`
  );

  return res;
}
