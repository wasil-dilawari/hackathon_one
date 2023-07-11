import { Button } from "@/components/ui/button";

export default function ProdVariants(props: { sizes: string[] }) {
  return (
    <>
      <div className=" font-bold text-base pt-4 md:pt-8 tracking-wide">
        SELECT SIZE
      </div>
      <div className=" flex gap-4 pt-2 md:pt-4">
        {props.sizes.map((size) => (
          <Button
            // variant="outline"
            className=" bg-gray-50 rounded-full hover:shadow-md hover:bg-white text-gray-500 font-bold h-8 w-8 text-sm"
            key={size}
          >
            {size}
          </Button>
        ))}
      </div>
    </>
  );
}
