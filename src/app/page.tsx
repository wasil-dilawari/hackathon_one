import Link from "next/link";
import { client } from "../../sanity/lib/client";

export async function getCategoryData() {
  const res = await client.fetch(`*[_type=="category"]{_id, title}`);
  return res;
}

interface category {
  _id: string;
  title: string;
}

export default async function Home() {
  const data = await getCategoryData();
  return (
    <main>
      <div>
        {data.map((data: category) => (
          <div key={data._id}>
            <Link href={data.title}>{data.title}</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
