"use client";

import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { Image as IImage } from "sanity";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Iproduct {
  _id: string;
  title: string;
  price: number;
  primaryImage: IImage;
}

export default function SwiperComponent(props: { data: Iproduct[] }) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        breakpoints={{
          1260: { slidesPerView: 4.25, spaceBetween: 0 },
          768: { slidesPerView: 3.25, spaceBetween: 0 },
          300: { slidesPerView: 1.25, spaceBetween: 0 },
        }}
        scrollbar
      >
        {props.data.map((product: Iproduct, index) => (
          <SwiperSlide key={product._id}>
            <div className=" scale-90 lg:transition lg:ease-in-out lg:hover:scale-100 lg:duration-300 shadow-lg p-2">
              <Link href={`/product/${product._id}`}>
                <div className=" flex justify-center">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
