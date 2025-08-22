import Navbar from "@/components/Navbar";
import JewelryCategories from "@/components/sections/JewelryCategories";
import JewelryHero from "@/components/sections/JewelryHero";
import NewHero from "@/components/sections/NewHero";
import WeddingJewelry from "@/components/sections/WeddingJewelry";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <JewelryHero />; */}
      <NewHero />
      <JewelryCategories/>
      <WeddingJewelry/>
    </>
  );
}
