import { CheckCircle2 } from "lucide-react";
import React from "react";

export default function SuccessPage() {
  return (
    <section className="  bg-gray-50 py-10 px-10">
      <div className=" ">
        <div className=" font-bold text-2xl pb-10">Shopping Cart</div>
        <div className=" flex flex-col items-center justify-center">
          <CheckCircle2 className=" h-28 w-28 text-[green]" />
          <div className=" font-bold text-2xl text-center py-2">
            Order Placed Successfully
          </div>
          <div>Thank You for shopping with us.</div>
        </div>
      </div>
    </section>
  );
}
