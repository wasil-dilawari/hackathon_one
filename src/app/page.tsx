import Hero from "@/components/views/Hero";
import Intro from "@/components/views/Intro";
import Newsletter from "@/components/views/Newsletter";
import Products from "@/components/views/Products";
import Promotions from "@/components/views/Promotions";

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
