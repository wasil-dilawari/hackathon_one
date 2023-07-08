import { client } from "../../../sanity/lib/client";
import { Image as IImage } from "sanity";
import { ProductCard } from "@/components/productCard";

async function getCategoryID(categoryTitle: string) {
  const res = await client.fetch(
    `*[_type=="category" && title=="${categoryTitle}"]{_id}`
  );
  // console.log(res[0]._id);

  return res[0]._id;
}

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
  // async function getProductData(categoryID: string, categoryTitle: string) {
  // const res = await client.fetch(
  //   `*[_type == "product" && references("${categoryID}")]
  //   {
  //     _id,
  //     title,
  //     price,
  //     primaryImage,
  //     productType -> {title}}`
  // );
  // console.log(res);

  return res;
}

interface Iproduct {
  _id: string;
  title: string;
  price: number;
  primaryImage: IImage;
  productType: string;
}

export default async function categoryPage({
  params,
}: {
  params: { category: string };
}) {
  // const catID: string = await getCategoryID(params.category);
  //   console.log(catID);

  const data: Iproduct[] = await getProductData(params.category);
  // const data: Iproduct[] = await getProductData(catID);

  return (
    <div className=" flex flex-col ">
      <div className=" text-gray-200 font-semibold text-5xl md:text-9xl mb-4 text-center lg:text-left">
        {params.category === "All" ? "All Products" : params.category}
      </div>
      <div className=" flex flex-col items-center">
        <div className=" grid grid-cols-1 md:grid-cols-[repeat(3,auto)] justify-center gap-10">
          {data.length === 0 ? (
            <div>No products found in {params.category}</div>
          ) : (
            data.map((product: Iproduct) => (
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
