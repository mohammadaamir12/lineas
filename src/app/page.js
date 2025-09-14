import AllProperties from "@/components/AllProperties";
import Awards from "@/components/Awards";
import FAQ from "@/components/Faq";
import FeaturedProperties from "@/components/FeaturesProperties";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LatestInsights from "@/components/LatestInsights";
import LatestProperties from "@/components/LatestProperties";
import Testimonials from "@/components/Testominal";
import ValuationCTA from "@/components/ValuationCTA";
import { Toaster } from "react-hot-toast";

import Image from "next/image";

export default function Home() {
  
  return (
  <div className="dark:bg-black">
   <Toaster position="top-center" />
  <Header />
  <HeroSection/>
   <FeaturedProperties/>
  <LatestProperties/>
  <AllProperties/>
  <ValuationCTA/>
  <Awards/>
  <Testimonials/>
  <LatestInsights/>
  <FAQ/> 
  <Footer/>
  </div>
  );
}
