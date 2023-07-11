"use client";

// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProdQty() {
  const [qty, setQty] = useState(1);
  return (
    <>
      <div className=" flex flex-col lg:flex-row lg:items-center text-base pt-4 md:pt-8 tracking-wide">
        <div className=" font-bold ">Quantity:</div>
        <div className=" flex items-center mt-2 lg:mt-0">
          <Button
            className=" bg-gray-200 rounded-full hover:bg-gray-200 text-gray-800 h-8 w-8 text-sm hover:ring-1 ring-gray-700 lg:ml-4 mr-4"
            onClick={() => {
              if (qty > 1) {
                setQty(qty - 1);
              } else {
                toast.error("Quantity cannot be less than 1", {
                  iconTheme: {
                    primary: "#FFC300",
                    secondary: "#FFFAEE",
                  },
                });
              }
            }}
          >
            -
          </Button>
          <div>{qty}</div>
          {/* <Input
          type="text"
          size={1}
          defaultValue={1}
          className=" font-light text-gray-500 border border-gray-400 rounded-none w-fit "
        /> */}
          <Button
            className=" bg-gray-200 rounded-full hover:bg-gray-200 text-gray-800 h-8 w-8 text-sm hover:ring-1 ring-gray-700 ml-4"
            onClick={() => {
              if (qty < 10) {
                setQty(qty + 1);
              } else {
                toast.error("Quantity cannot be more than 10", {
                  iconTheme: {
                    primary: "#FFC300",
                    secondary: "#FFFAEE",
                  },
                });
              }
            }}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
}
