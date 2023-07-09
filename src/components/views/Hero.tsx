import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";

import heroImage from "public/images/products/hero_main.webp";
import logoBazaar from "public/images/logos/br_bazaar.webp";
import logoBustle from "public/images/logos/br_bustle.webp";
import logoVersace from "public/images/logos/br_versace.webp";
import logoInstyle from "public/images/logos/br_instyle.webp";

export default function Hero() {
  return (
    <section className=" px-10 ">
      <div className=" flex flex-col-reverse md:flex-row justify-center items-center gap-y-10 md:gap-x-10">
        <div className=" flex-1">
          <Badge className=" rounded-md bg-blue-100 hover:bg-blue-100 text-[blue] py-2 px-4 text-sm justify-center">
            Sale 70%
          </Badge>
          <h1 className=" mt-6 scroll-m-20 text-4xl font-bold tracking-wide lg:text-5xl">
            An Industrial Take on Streetwear
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Anyone can beat you but no one can beat your outfit as long as you
            wear Dine outfits.
          </p>
          <Link href={"All"}>
            <Button className=" rounded-none px-4 py-8 font-semibold mt-6">
              <ShoppingCart className=" mr-4 h-5 w-5" />
              Start
              <br />
              Shopping
            </Button>
          </Link>
          <div className=" flex mt-6 gap-4">
            <Image src={logoBazaar} alt="Bazaar" />
            <Image src={logoBustle} alt="Bustler" />
            <Image src={logoVersace} alt="Versace" />
            <Image src={logoInstyle} alt="InStyle" />
          </div>
        </div>
        <div className=" flex-1 ">
          <div className=" flex justify-center items-center">
            <div className=" rounded-full bg-[#ffece3] h-60 w-60 lg:h-96 lg:w-96 -z-10 absolute"></div>
            <Image src={heroImage} alt="Start Shopping" />
          </div>
        </div>
      </div>
    </section>
  );
}
