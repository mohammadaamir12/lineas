// app/components/HeroSection.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("rent");

  return (
    <section className="relative h-[85vh] flex flex-col justify-center items-center text-center w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/HeroVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
     
      <div className="relative z-10 flex flex-col items-center px-2 sm:px-4 md:px-6 py-8 md:py-12 w-full max-w-3xl -mt-36">
        <h1 className="text-4xl md:text-5xl font-bold text-white ">
          Find Your Future
        </h1>
        <p className="mt-2 text-lg text-gray-200">
          Discover properties that define tomorrow&apos;s living, today.
        </p>

        {/* Tabs & Search */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg w-full mt-5">
  {/* Tabs */}
  <div className="flex w-full justify-between">
    <button
      className={`text-lg font-semibold pb-1 transition w-1/2 p-4 rounded-tl-xl  border-r-3 border-r-white/30 ${
        activeTab === "rent"
          ? "text-white border-b-2 border-white bg-white/10"
          : "text-gray-200 hover:text-white"
      }`}
      onClick={() => setActiveTab("rent")}
    >
      Rent
    </button>
    <button
      className={`text-lg font-semibold pb-1 transition w-1/2 p-4 rounded-tr-xl ${
        activeTab === "buy"
          ? "text-white border-b-2 border-white bg-white/10"
          : "text-gray-200 hover:text-white"
      }`}
      onClick={() => setActiveTab("buy")}
    >
      Buy
    </button>
  </div>

  {/* Search bar */}
  <div className="mt-5 flex items-center bg-white backdrop-blur-lg rounded-lg border border-white/40 px-2 m-4">
    <input
      type="text"
      placeholder={`Search properties to ${
        activeTab === "buy" ? "buy" : "rent"
      } by location or property ID...`}
      className="flex-1 py-3 bg-transparent text-white placeholder-slate-800 outline-none text-sm"
    />
    <button className="ml-auto p-2 bg-slate-900 rounded-lg shadow-md flex items-center justify-center gap-2">
      <h3 className="text-white text-sm">Search</h3>
      <Search className="text-white" size={18} />
    </button>
  </div>
</div>
      </div> 

      {/* Bottom Valuation Section */}
      <div className="absolute bottom-0 left-0 w-full bg-[#1D283C] text-white 
  px-4 sm:px-8 md:px-12 lg:px-20 
  py-6 md:py-12 lg:py-12 
  flex flex-col md:flex-row items-center justify-between gap-4"
>
  <div className="text-left">
  <h3 className="text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">
    Find out how much your home is worth today
  </h3>
  <p className="text-gray-300 text-base sm:text-sm md:text-md lg:text-lg mt-2">
    Get a free accurate home valuation from our local experts
  </p>
</div>
  <Link href="/bookvaluation">
      <button className="px-6 py-2 border border-white rounded-md hover:bg-white hover:text-black transition">
        Book A Valuation
      </button>
    </Link>
</div>


    </section>
  );
}
