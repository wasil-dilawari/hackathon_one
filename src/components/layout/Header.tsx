// "use client";

import { client } from "../../../sanity/lib/client";
import Navbar from "../custom/Navbar";

export interface INavLinks {
  _id: string;
  title: string;
}

async function getCategoryData() {
  const res = await client.fetch(`*[_type=="category"]{_id, title}`);
  return res;
}

export default async function Header() {
  const navLinks: INavLinks[] = await getCategoryData();

  return (
    <header className=" ">
      <Navbar navLinks={navLinks} />
    </header>
  );
}
