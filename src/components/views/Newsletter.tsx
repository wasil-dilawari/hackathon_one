import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className=" px-10 mt-40 ">
      <div className=" flex flex-col items-center gap-4">
        <div className=" text-gray-100 font-extrabold text-6xl md:text-8xl lg:text-9xl text-center -z-10 absolute pt-24 md:pt-6 lg:pt-2">
          Newsletter
        </div>
        <div className=" text-blue-600 font-semibold text-xs tracking-wider text-center"></div>
        <h2 className="text-3xl font-bold text-center">
          Subscribe Our Newsletter
        </h2>
        <p className=" font-light text-center">
          Get the latest information and promo offers directly
        </p>
        <div className=" flex gap-4">
          <Input
            type="email"
            placeholder="Input Email Address"
            className=" font-light text-gray-500 border border-gray-600 rounded-none"
          />
          <Button className=" rounded-none bg-black text-xs py-4 px-8">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
