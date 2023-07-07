import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";

import { Image as IImage } from "sanity";

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
    <section className=" mt-6">
      <div className=" flex flex-col items-center gap-4">
        <div className=" text-blue-600 font-semibold text-xs tracking-wider">
          PRODUCTS
        </div>
        <h2 className="text-3xl font-bold">Check What We Have</h2>
        <div className=" flex justify-center items-start">
          {data.map((product: Iproduct) => (
            <div
              key={product._id}
              className=" transition ease-in-out hover:scale-110 duration-300"
            >
              <div>
                <Image
                  src={urlForImage(product.primaryImage).url()}
                  alt={product.title}
                  width={300}
                  height={400}
                />
              </div>
              <h2 className=" font-semibold text-lg mt-4">{product.title}</h2>
              <p className=" font-semibold text-lg ">${product.price}</p>
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
