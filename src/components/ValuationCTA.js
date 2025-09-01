"use client";
import React from "react";

const ValuationCTA = () => {
  return (
    <section
      className="relative py-20 px-6 flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1600&h=800&fit=crop')", // replace with your blurred background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1b365d]/90"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
          Looking to sell or let your property?
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Get a professional valuation from our expert team and discover your
          property&apos;s true market value.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/valuation"
            className="bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-cyan-600 transition shadow-md"
          >
            Book a Valuation
          </a>
          <a
            href="/contact"
            className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-full font-semibold hover:bg-cyan-500 hover:text-white transition shadow-md"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default ValuationCTA;
