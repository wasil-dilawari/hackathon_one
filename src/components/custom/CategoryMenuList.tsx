import { client } from "../../../sanity/lib/client";
import Link from "next/link";

interface ICategory {
  _id: string;
  title: string;
}

async function getCategoryData() {
  const res = await client.fetch(`*[_type=="category"]{_id, title}`);
  return res;
}

export default async function CategoryMenuList() {
  const data: ICategory[] = await getCategoryData();

  return (
    <ul className=" flex gap-6">
      {data.map((data: ICategory) => (
        <li key={data._id}>
          <Link href={`/${data.title}`}>{data.title}</Link>
        </li>
      ))}
      {/* <li>
        <Link href={`/Women`}>Women</Link>
      </li>
      <li>
        <Link href={`/Men`}>Men</Link>
      </li>
      <li>
        <Link href={`/Kids`}>Kids</Link>
      </li> */}
      <li>
        <Link href="/All">All Products</Link>
      </li>
    </ul>
  );
}
