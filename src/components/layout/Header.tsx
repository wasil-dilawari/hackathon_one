// "use client";

import Image from "next/image";
import logoImage from "public/images/logos/logo.webp";
import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import CategoryMenuList from "@/components/custom/CategoryMenuList";
import IconHeaderCart from "@/components/custom/IconHeaderCart";

export default function Header() {
  return (
    <header className=" ">
      <div className=" flex flex-col md:flex-row justify-between items-center mx-4 my-4 gap-y-2 lg:mx-10 lg:my-8 ">
        <Link href="/">
          <Image src={logoImage} alt="eStore Logo" />
        </Link>
        <CategoryMenuList />
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
        <IconHeaderCart />
      </div>
    </header>
  );
}
