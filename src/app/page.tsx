import Link from "next/link";
import { client } from "../../sanity/lib/client";

export async function getCategoryData() {
  const res = await client.fetch(`*[_type=="category"]{_id, title}`);
  return res;
}

interface Icategory {
  _id: string;
  title: string;
}

export default async function Home() {
  const data: Icategory[] = await getCategoryData();
  return (
    <main>
      <div>
        {data.map((data: Icategory) => (
          <div key={data._id}>
            <Link href={data.title}>{data.title}</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
