import HeroSection from "@/components/home/heroSection";
import ProductBar from "@/components/home/ProductBar";
import Menu from "@/components/home/ProductBar";
import Products from "@/components/home/ProductList";
import SecondSection from "@/components/home/secondSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <ProductBar />

      <SecondSection />
    </main>
  );
}
