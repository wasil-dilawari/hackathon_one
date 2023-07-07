import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import logoImage from "../../../public/logo.webp";
import {
  PiMagnifyingGlassLight,
  PiShoppingCartSimpleDuotone,
} from "react-icons/pi";

async function getCategoryData() {
  const res = await client.fetch(`*[_type=="category"]{_id, title}`);
  return res;
}

interface Icategory {
  _id: string;
  title: string;
}

export default async function Header() {
  const data: Icategory[] = await getCategoryData();
  return (
    <>
      <div className=" flex justify-center ">
        <div className=" flex grow justify-between items-center gap-6 my-8 max-w-5xl">
          <div className=" flex items-center justify-center h-full">
            <Link href="/">
              <Image
                src={logoImage}
                alt="eStore Logo"
                // width={135}
                // height={28}
                className=" center"
              />
            </Link>
          </div>
          <div className=" grid grid-cols-[repeat(4,auto)] justify-start gap-4 items-center">
            {data.map((data: Icategory) => (
              <div key={data._id}>
                <Link href={data.title}>{data.title}</Link>
              </div>
            ))}
            <div>
              <Link href="All">All Products</Link>
            </div>
          </div>
          <div className=" flex flex-grow"> </div>
          <div className=" flex items-center border border-gray-300 rounded-md">
            <PiMagnifyingGlassLight className="h-4 w-4 text-gray-400 " />
            <input
              className=" font-light text-sm px-1 rounded-md"
              size={30}
              type="text"
              placeholder="What are you looking for"
            ></input>
          </div>
          <div className=" flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full ">
            <PiShoppingCartSimpleDuotone className=" h-6 w-6 text-gray-700 " />
          </div>
        </div>
      </div>
    </>
  );
}
