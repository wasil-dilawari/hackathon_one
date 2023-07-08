import Hero from "@/views/Hero";
import Intro from "@/views/Intro";
import Newsletter from "@/views/Newsletter";
import Products from "@/views/Products";
import Promotions from "@/views/Promotions";

export default function Home() {
  return (
    <div>
      <Hero />
      <Promotions />
      <Products />
      <Intro />
      <Newsletter />
    </div>
  );
}
