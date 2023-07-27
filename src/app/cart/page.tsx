import CartListingDrizzle from "@/components/custom/CartListingDrizzle";

export const metadata = {
  title: "Shopping Cart",
  description: "Full stack eCommerce Website using NextJS",
};

export default async function DrizzleCartPage() {
  return (
    <section className="  bg-gray-50 py-10 px-10">
      <div className=" ">
        <div className=" font-bold text-2xl pb-10">Shopping Cart</div>

        {/* Shopping Cart Component to get data from Drizzle */}
        <CartListingDrizzle />
      </div>
    </section>
  );
}
