// app/components/LandlordFeesSection.tsx
"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function LandlordFeesSection() {
  return (
    <div>
        <Header/>
   
    <section className="w-full">
      {/* Header Section with Background Image and Blur Effect */}
      <div
  className="relative h-80 flex items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: 'url("/footer-bg.png")',
  }}
>
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        
        {/* Title */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Landlord Fees
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Choosing the area section */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
  Choosing the area you&apos;d like to live in
</h2>
<p className="text-gray-700 leading-relaxed text-lg">
  Do your research and figure out the specific areas you&apos;d like to rent in. Make a list of the things that are 
  really important to you, like transport links, schools, access to shops and use these to focus your search. 
  Be sure to share your list of &apos;must-haves&apos; and &apos;nice-to-haves&apos; with the local estate agents so they can start 
  working for you.
</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
     </div>
  );
}