/* Dynamically created Product Listing Page based on category */

import ProductCard from "@/components/custom/ProductCard";
import { client } from "../../../sanity/lib/client";
import { Image as IImage } from "sanity";

interface IProduct {
  _id: string;
  title: string;
  price: number;
  primaryImage: IImage;
  productType: { title: string };
}

/* generateMetadata to update Page Title of Dynamic Category Page*/

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  return {
    title: params.category,
  };
}

/* getProductData function to retrieve Products from Sanity for a category passed as params */

async function getProductData(category: string) {
  if (category === "All") {
    var res = await client.fetch(
      `*[_type == "product"]
      {
        _id,
        title,
        price,
        primaryImage,
        productType -> {title}
      }`
    );
  } else {
    var res = await client.fetch(
      `*[_type == "product" && references(*[_type == "category" && title == "${category}"][0]._id)]
    {
      _id,
      title,
      price,
      primaryImage,
      productType -> {title}
    }`
    );
  }
  return res;
}

export default async function categoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: IProduct[] = await getProductData(params.category);

  return (
    <div className=" flex flex-col ">
      {/* Category Heading */}
      <div className=" text-gray-200 font-semibold text-4xl md:text-7xl lg:text-9xl mb-4 text-center lg:text-left">
        {params.category === "All" ? "All Products" : params.category}
      </div>
      {/* Product List */}
      <div className=" flex flex-col items-center">
        <div className=" grid grid-cols-1 md:grid-cols-[repeat(3,auto)] lg:grid-cols-[repeat(4,auto)] justify-center gap-10">
          {data.length === 0 ? (
            <div>No products found in {params.category}</div>
          ) : (
            data.map((product: IProduct) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
