import { client } from "../../../sanity/lib/client";
import { Image as IImage } from "sanity";
import SwiperComponent from "../custom/SwiperComponent";

interface Iproduct {
  _id: string;
  title: string;
  price: number;
  primaryImage: IImage;
}

export default async function Products() {
  const data: Iproduct[] = await getProductData();

  return (
    <section className=" px-10 mt-20 ">
      <div className=" flex flex-col items-center gap-4">
        <div className=" text-blue-600 font-semibold text-xs tracking-wider text-center">
          PRODUCTS
        </div>
        <h2 className="text-3xl font-bold text-center">Check What We Have</h2>
        {/* <div className=" flex flex-col gap-8 md:gap-0 md:flex-row justify-center items-start"> */}
        {/* </div> */}
      </div>
      <div className=" flex justify-center -mx-10">
        <SwiperComponent data={data} />
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
