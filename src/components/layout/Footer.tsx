import Image from "next/image";
import logo from "/public/logo.webp";
import { Twitter, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center mt-32">
      <section className=" flex justify-around grow max-w-5xl mx-10">
        <div className=" grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className=" md:col-span-2">
            <div className=" flex flex-col gap-6 items-center md:items-start">
              <div>
                <Image src={logo} alt="eStore Logo" />
              </div>
              <div className=" text-gray-500 md:pr-10 text-center md:text-left">
                Small, artisan label that offers a thoughtfully curated
                collection of high quality everyday essentials made
              </div>
              <div className=" flex gap-10 text-gray-700">
                <div className=" flex justify-center items-center bg-gray-200 rounded-lg w-10 h-10">
                  <Twitter
                    className=" h-5 w-5 fill-gray-600 text-gray-600"
                    strokeWidth={1}
                  />
                </div>
                <div className=" flex justify-center items-center bg-gray-200 rounded-lg w-10 h-10">
                  <Facebook
                    className=" h-5 w-5 fill-gray-600 text-gray-600"
                    strokeWidth={1}
                  />
                </div>
                <div className=" flex justify-center items-center bg-gray-200 rounded-lg w-10 h-10">
                  <Linkedin
                    className=" h-5 w-5 fill-gray-600 text-gray-600"
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col items-center md:items-start gap-y-3 text-gray-500 mt-6 md:mt-0">
            <div className=" font-semibold text-gray-600">Company</div>
            <div className=" ">About</div>
            <div className=" ">Terms of Use</div>
            <div className=" ">Privacy Policy</div>
            <div className=" ">How it Works</div>
            <div className=" ">Contact Us</div>
          </div>
          <div className=" flex flex-col items-center md:items-start gap-y-3 text-gray-500">
            <div className=" font-semibold text-gray-600">Support</div>
            <div className=" ">Support Center</div>
            <div className=" ">24H Service</div>
            <div className=" ">Quick Chat</div>
          </div>
          <div className=" flex flex-col items-center md:items-start gap-y-3 text-gray-500">
            <div className=" font-semibold text-gray-600">Contact</div>
            <div className=" ">WhatsApp</div>
            <div className=" ">24H Support</div>
          </div>
        </div>
      </section>
      <section className=" border-t border-gray-700 mt-20 w-full text-xs">
        <div className=" grid grid-cols-[repeat(3,auto)] m-6 text-gray-500 justify-between">
          <div>
            <div>Copyright © 2023</div>
            <div className=" font-semibold">WD eStore</div>
          </div>
          <div>
            <div>Design by</div>
            <div className=" font-semibold">WAD</div>
          </div>
          <div>
            <div>Code by</div>
            <div className=" font-semibold">WAD</div>
          </div>
        </div>
      </section>
    </footer>
  );
}
