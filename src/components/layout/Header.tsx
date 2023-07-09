import Image from "next/image";
import logoImage from "public/images/logos/logo.webp";
import { ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { Input } from "@/components/ui/input";

interface Icategory {
  _id: string;
  title: string;
}
async function getCategoryData() {
  const res = await client.fetch(`*[_type=="category"]{_id, title}`);
  return res;
}

export default async function Header() {
  const data: Icategory[] = await getCategoryData();

  return (
    <header className=" ">
      <div className=" flex flex-col md:flex-row justify-between items-center mx-4 my-4 gap-y-2 lg:mx-10 lg:my-8 ">
        <Link href="/">
          <Image src={logoImage} alt="eStore Logo" />
        </Link>
        <ul className=" flex gap-6">
          {data.map((data: Icategory) => (
            <li key={data._id}>
              <Link href={`/${data.title}`}>{data.title}</Link>
            </li>
          ))}
          <li>
            <Link href="/All">All Products</Link>
          </li>
        </ul>
        <div className="hidden lg:block">
          <div className=" flex items-center border border-gray-300 rounded-md">
            <Search className="h-4 w-4 text-gray-400 ml-1 " />
            <Input
              className=" font-light text-sm px-1 rounded-md"
              size={30}
              type="text"
              placeholder="What are you looking for"
            />
          </div>
        </div>

        <div className=" flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full ">
          <ShoppingCart className=" h-6 w-6 text-gray-700" />
        </div>
      </div>
    </header>
  );
}
