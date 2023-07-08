import { Button } from "@/components/ui/button";
import Image from "next/image";
import introImage from "public/intro_img.webp";

export default function Intro() {
  return (
    <section className=" mt-20">
      <div className=" lg:grid lg:grid-cols-2">
        <div className=" "></div>
        <div className=" text-center lg:text-left text-5xl font-bold tracking-tight lg:px-16">
          Unique and Authentic Vintage Designer Jewellery
        </div>
      </div>
      <div className=" hidden md:block bg-gray-50 text-gray-200 text-8xl font-extrabold tracking-widest -mx-10 py-20 px-10 md:px-20 lg:px-32 -z-10 absolute">
        <div className=" lg:grid lg:grid-cols-2">
          <div className=" pb-20">Different from Others</div>
          <div></div>
        </div>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-2 pt-20 md:mx-16 lg:mx-20">
        <div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className=" py-1 md:py-2 font-semibold text-lg leading-tight text-center md:text-left">
                Using Good Quality Materials
              </div>
              <div className=" font-light py-1 md:py-2 lg:pr-12 text-center md:text-left">
                ULorem ipsum dolor sit amt, consectetur adipiscing elit.
              </div>
            </div>
            <div>
              <div className=" py-1 md:py-2 font-semibold text-lg leading-tight text-center md:text-left">
                100% Handmade Products
              </div>
              <div className=" font-light py-1 md:py-2 lg:pr-12 text-center md:text-left">
                ULorem ipsum dolor sit amt, consectetur adipiscing elit.
              </div>
            </div>
            <div>
              <div className=" py-1 md:py-2 font-semibold text-lg leading-tight text-center md:text-left">
                Modern Fashion Design
              </div>
              <div className=" font-light py-1 md:py-2 lg:pr-12 text-center md:text-left">
                ULorem ipsum dolor sit amt, consectetur adipiscing elit.
              </div>
            </div>
            <div>
              <div className=" py-1 md:py-2 font-semibold text-lg leading-tight text-center md:text-left">
                Discount for Bulk Orders
              </div>
              <div className=" font-light py-1 md:py-2 lg:pr-12 text-center md:text-left">
                ULorem ipsum dolor sit amt, consectetur adipiscing elit.
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:ml-10 h-full pt-10 lg:pt-0">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[60%,40%] h-full gap-10">
            <div className=" ">
              <Image src={introImage} alt="Different from Others" />
            </div>
            <div>
              <div className=" py-2 text-justify font-light">
                This piece is ethically crafted in our small family-owned
                workshop in Peru with unmatched attention to detail and care.
                The Natural color is the actual natural color of the fiber,
                undyed and 100% traceable.
              </div>
              <Button className=" bg-black text-white rounded-none px-6 py-8 mt-4">
                See All <br />
                Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
