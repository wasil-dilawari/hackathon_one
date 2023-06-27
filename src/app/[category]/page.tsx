import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";

export async function getCategoryID(categoryTitle: string) {
  const res = await client.fetch(
    `*[_type=="category" && title=="${categoryTitle}"]{_id}`
  );
  //   console.log(res[0]._id);

  return res[0]._id;
}

export async function getProductData(categoryID: string) {
  const res = await client.fetch(
    `*[_type == "product" && references("${categoryID}")]
    {
      _id, 
      title, 
      price, 
      primaryImage, 
      productType -> {title}}`
  );
  //   console.log(res);

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
  const catID: string = await getCategoryID(params.category);
  //   console.log(catID);

  const data: Iproduct[] = await getProductData(catID);

  return (
    <div>
      <div>You are at {params.category}</div>
      <div className=" grid grid-cols-[repeat(3,auto)] justify-center gap-4">
        {data.map((product: Iproduct) => (
          <div id={product._id}>
            <Image
              src={urlForImage(product.primaryImage).url()}
              alt={product.title}
              width={200}
              height={300}
            />
            <div className="text-center">{product.title}</div>
            <div className="text-center">${product.price}</div>
            <div className=" flex justify-center">
              <button className=" bg-slate-300 rounded-full px-3 py-1">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
