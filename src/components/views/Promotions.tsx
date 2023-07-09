import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import promoImage1 from "public/images/products/promo_img_1.webp";
import promoImage2 from "public/images/products/promo_img_2.webp";
import promoImage3 from "public/images/products/promo_img_3.webp";

export default function Promotions() {
  return (
    <section className=" px-10 mt-20 ">
      <div className=" flex flex-col items-center gap-4">
        <div className=" text-blue-600 font-semibold text-xs tracking-wider text-center">
          PROMOTIONS
        </div>
        <h2 className="text-3xl font-bold text-center">
          Our Promotions Events
        </h2>
        <div className=" grid grid-cols-1 lg:grid-cols-[40%,60%] gap-6">
          <div className=" grid grid-rows-2 gap-4 ">
            <div className=" flex flex-col md:flex-row bg-gray-300 justify-center items-center">
              <div className=" flex flex-col justify-center gap-2 md:gap-4 md:pl-10 h-full ">
                <p className=" font-bold text-3xl tracking-tight pt-4 md:pt-0">
                  GET UP TO{" "}
                  <span className=" font-extrabold text-4xl">60%</span>
                </p>
                <p className=" text-lg tracking-wider">For the summer season</p>
              </div>
              <div className=" flex items-end h-full ">
                <Image src={promoImage1} alt="Promotion" height={300} />
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center bg-black text-white">
              <div className=" text-4xl font-bold tracking-tight py-6">
                GET 30% Off
              </div>
              <div className=" text-sm tracking-widest">USE PROMO CODE</div>
              <Badge className=" rounded-lg bg-gray-700 hover:bg-gray-700 text-base font-semibold tracking-tight m-2 px-20 py-1">
                WEEKENDSALE
              </Badge>
            </div>
          </div>
          <div className=" ">
            <div className=" grid grid-cols-2 gap-6">
              <div className=" bg-orange-100">
                <p className=" pt-4 pl-4">Flex Sweatshirt</p>
                <p className=" pt-1 pl-4">
                  <span className=" line-through">$100</span>{" "}
                  <span className=" font-bold">$75</span>
                </p>
                <Image src={promoImage2} alt="Promotion" height={400} />
              </div>
              <div className=" bg-gray-100">
                <p className=" pt-4 pl-4">Flex Pushbutton Bomber</p>
                <p className=" pt-1 pl-4">
                  <span className=" line-through">$225</span>{" "}
                  <span className=" font-bold">$190</span>
                  <Image src={promoImage3} alt="Promotion" height={400} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
