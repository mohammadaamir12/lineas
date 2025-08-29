// app/components/HeroSection.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Find Your Future
        </h1>
        <p className="mt-2 text-lg text-gray-200">
          Discover properties that define tomorrow&apos;s living, today.
        </p>

        {/* Tabs & Search */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-2xl">
          {/* Tabs */}
          <div className="flex justify-center gap-12 border-b border-white/40 pb-3">
            <button
              className={`text-lg font-semibold pb-1 transition ${
                activeTab === "buy"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-200 hover:text-white"
              }`}
              onClick={() => setActiveTab("buy")}
            >
              Buy
            </button>
            <button
              className={`text-lg font-semibold pb-1 transition ${
                activeTab === "rent"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-200 hover:text-white"
              }`}
              onClick={() => setActiveTab("rent")}
            >
              Rent
            </button>
          </div>

          {/* Search bar */}
          <div className="mt-5 flex items-center bg-white/10 backdrop-blur-lg rounded-lg border border-white/40 px-3">
            <input
              type="text"
              placeholder={`Search properties to ${
                activeTab === "buy" ? "buy" : "rent"
              } by location or property ID...`}
              className="flex-1 py-3 bg-transparent text-white placeholder-gray-300 outline-none text-sm"
            />
            <button className="ml-auto p-2 bg-white rounded-lg shadow-md flex items-center justify-center">
              <Search className="text-black" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Valuation Section */}
      <div className="absolute bottom-0 left-0 w-full bg-[#0A1C35] text-white px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Find out how much your home is worth today
          </h3>
          <p className="text-gray-300 text-sm">
            Get a free accurate home valuation from our local experts
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-6 py-2 border border-white rounded-md hover:bg-white hover:text-black transition">
          Book A Valuation
        </button>
      </div>
    </section>
  );
}
