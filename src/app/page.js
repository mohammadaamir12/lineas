import AllProperties from "@/components/AllProperties";
import Awards from "@/components/Awards";
import FeaturedProperties from "@/components/FeaturesProperties";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LatestProperties from "@/components/LatestProperties";
import ValuationCTA from "@/components/ValuationCTA";

import Image from "next/image";

export default function Home() {
  
  return (
  <div className="dark:bg-black">
  <Header />
  <HeroSection/>
  <FeaturedProperties/>
  <LatestProperties/>
  <AllProperties/>
  <ValuationCTA/>
  <Awards/>
  </div>
  );
}
