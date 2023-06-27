import Link from "next/link";
import { client } from "../../../sanity/lib/client";

export async function getCategoryID(categoryTitle: string) {
  const res = await client.fetch(
    `*[_type=="category" && title=="${categoryTitle}"]{_id}`
  );
  //   console.log(res[0]._id);

  return res[0]._id;
}

export async function getProductData(categoryID: string) {
  const res = await client.fetch(
    `*[_type == "product" && references("${categoryID}")]{_id, title}`
  );
  //   console.log(res);

  return res;
}

interface product {
  _id: string;
  title: string;
}

export default async function categoryPage({
  params,
}: {
  params: { category: string };
}) {
  const catID = await getCategoryID(params.category);
  //   console.log(catID);

  const data = await getProductData(catID);

  return (
    <div>
      <div>You are at {params.category}</div>
      {data.map((product: product) => (
        <div id={product._id}>{product.title}</div>
      ))}
      <Link href="/">Back to Home</Link>
    </div>
  );
}
