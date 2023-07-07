import Image from "next/image";
import logo from "../../../public/logo.webp";
import { BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <div className=" flex flex-col items-center justify-center mt-32">
      <div className=" flex justify-around grow max-w-5xl">
        <div className=" grid grid-cols-[18rem] mx-10">
          <div className=" flex flex-col gap-6">
            <div>
              <Image src={logo} alt="eStore Logo" />
            </div>
            <div className=" text-gray-600">
              Small, artisan label that offers a thoughtfully curated collection
              of high quality everyday essentials made
            </div>
            <div className=" flex gap-10 text-gray-700">
              <div className=" flex justify-center items-center bg-gray-200 rounded-lg w-10 h-10">
                <BsTwitter className=" h-5 w-5" />
              </div>
              <div className=" flex justify-center items-center bg-gray-200 rounded-lg w-10 h-10">
                <BsFacebook className=" h-5 w-5" />
              </div>
              <div className=" flex justify-center items-center bg-gray-200 rounded-lg w-10 h-10">
                <BsLinkedin className=" h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-3 gap-x-10 gap-y-4  text-gray-500">
          <div className=" flex flex-col gap-y-3">
            <div className=" font-semibold text-gray-600">Company</div>
            <div className=" ">About</div>
            <div className=" ">Terms of Use</div>
            <div className=" ">Privacy Policy</div>
            <div className=" ">How it Works</div>
            <div className=" ">Contact Us</div>
          </div>
          <div className=" flex flex-col gap-y-3">
            <div className=" font-semibold text-gray-600">Support</div>
            <div className=" ">Support Center</div>
            <div className=" ">24H Service</div>
            <div className=" ">Quick Chat</div>
          </div>
          <div className=" flex flex-col gap-y-3">
            <div className=" font-semibold text-gray-600">Contact</div>
            <div className=" ">WhatsApp</div>
            <div className=" ">24H Support</div>
          </div>
        </div>
      </div>
      <div className=" border-t border-gray-700 mt-20 w-full">
        <div className=" grid grid-cols-[repeat(3,auto)] m-6 text-gray-600 justify-between">
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
      </div>
    </div>
  );
}
