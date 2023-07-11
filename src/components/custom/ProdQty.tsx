import { Input } from "@/components/ui/input";

export default function ProdQty() {
  return (
    <>
      <div className=" flex items-center font-bold text-base pt-4 md:pt-8 tracking-wide">
        <div>Quantity:</div>
        <Input
          type="text"
          size={1}
          defaultValue={1}
          className=" font-light text-gray-500 border border-gray-400 rounded-none w-fit ml-2"
        />
      </div>
    </>
  );
}
