"use client";

import Link from "next/link";
import React, { useState } from "react";
import IconHeaderCart from "./IconHeaderCart";
import CategoryMenuList from "../../../trash/component/CategoryMenuList";
import Image from "next/image";
import logoImage from "public/images/logos/logo.webp";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { INavLinks } from "../layout/Header";

export interface NavbarProps {
  navLinks: INavLinks[];
}

export default function Navbar({ navLinks }: NavbarProps) {
  const [navbarStatus, setNavbarStatus] = useState(false);
  return (
    <nav className=" fixed z-50 bg-white/70 backdrop-blur-lg w-full">
      <div className=" flex flex-wrap md:flex-row justify-between items-center mx-4 my-4 gap-y-2 lg:mx-10 lg:my-8  ">
        <Link href="/" className=" order-1 ">
          <Image src={logoImage} alt="eStore Logo" />
        </Link>
        <div className=" order-last md:order-2 flex-1 md:px-10 hidden md:block">
          <ul className=" flex justify-center md:justify-start gap-6">
            {navLinks.map((data: INavLinks) => (
              <li key={data._id}>
                <Link href={`/${data.title}`}>{data.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/All">All Products</Link>
            </li>
          </ul>

          {/* <CategoryMenuList navLinks={navLinks} /> */}
        </div>
        <div className="hidden lg:block order-3 ">
          <div className=" flex items-center border border-gray-300 rounded-md">
            {/* <Search className="h-4 w-4 text-gray-400 ml-1 " />
        <Input
          className=" font-light text-sm px-1 rounded-md"
          size={30}
          type="text"
          placeholder="What are you looking for"
        /> */}
          </div>
        </div>
        <div className=" order-4 flex">
          <Link href={"/cart"}>
            <IconHeaderCart />
          </Link>
          <button
            className=" flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full ml-4 md:hidden"
            onClick={() => setNavbarStatus(!navbarStatus)}
          >
            {navbarStatus ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {navbarStatus ? (
        <div className=" order-last md:order-2 flex-1 md:px-10 md:hidden w-full">
          <ul className=" flex flex-col w-full justify-center pl-10 pb-10 md:justify-start gap-6 ">
            {navLinks.map((data: INavLinks) => (
              <li key={data._id}>
                <Link href={`/${data.title}`}>{data.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/All">All Products</Link>
            </li>
          </ul>

          {/* <CategoryMenuList navLinks={navLinks} /> */}
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}
