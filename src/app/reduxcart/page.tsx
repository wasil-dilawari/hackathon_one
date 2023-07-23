import CartListing from "@/components/custom/CartListing";

export default function CartPage() {
  return (
    <section className="  bg-gray-50 py-10 px-10">
      <div className=" ">
        <div className=" font-bold text-2xl pb-10">Shopping Cart</div>
        <CartListing />
      </div>
    </section>
  );
}
