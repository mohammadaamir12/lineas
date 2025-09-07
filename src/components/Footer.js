"use client";

import Image from "next/image";

export default function Footer() {
  return (
   <footer className="bg-[#F5F5F5]">
     <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
  {/* Logo & About */}
  <div>
    <div className="flex self-start mb-4">
      <Image
        src="/lineas-logo.png"
        alt="Lineas Estate Agents"
        width={280}
        height={160}
      />
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300">
      Lineas is one of London’s leading independent estate agency with a
      good local knowledge of London and surrounding areas.
    </p>
  </div>

  {/* Quick Links */}
  <div className="dark:bg-[#1D283C] dark:text-gray-300 p-4 rounded">
    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Quick Links</h4>
    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
      <li><a href="#" className="hover:text-black dark:hover:text-white">Terms of Use</a></li>
      <li><a href="#" className="hover:text-black dark:hover:text-white">Privacy Policy</a></li>
      <li><a href="#" className="hover:text-black dark:hover:text-white">Contact Support</a></li>
      <li><a href="#" className="hover:text-black dark:hover:text-white">Complaints</a></li>
      <li><a href="#" className="hover:text-black dark:hover:text-white">About</a></li>
    </ul>
  </div>

  {/* Contact */}
  <div className="dark:bg-[#1D283C] dark:text-gray-300 p-4 rounded">
    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Contact</h4>
    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
      <li>📧 info@lineas.co.uk</li>
      <li>🌍 lineas.co.uk</li>
      <li>📞 +44 207 265 9396</li>
    </ul>
  </div>

  {/* Newsletter */}
  <div className="dark:bg-[#1D283C] dark:text-gray-300 p-4 rounded">
    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Sign Up for Our Newsletter</h4>
    <div className="flex">
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none bg-white dark:bg-gray-700 dark:text-gray-100"
      />
      <button className="bg-gray-900 text-white px-4 rounded-r-lg hover:bg-gray-800">
        Subscribe
      </button>
    </div>
    <h4 className="font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">Follow Us</h4>
    <div className="flex space-x-3">
      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
</div>

<div className="py-6 px-4 lg:px-20">
  <div className="grid grid-cols-3 md:grid-cols-12 gap-3">
    {/* Row 1 (desktop: 4 logos, mobile: 3 logos in first row) */}
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/prs.png" alt="PRS" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/approved-code.png" alt="Approved Code" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/ico.png" alt="ICO" className="max-h-14 w-auto object-contain" />
    </div>

    {/* AllAgents → full width on mobile, wide on desktop */}
    <div className="col-span-3 md:col-span-6 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/all-agents.png" alt="All Agents" className="max-h-14 w-auto object-contain" />
    </div>

    {/* Row 2 (6 logos, mobile: 3 per row) */}
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/zoopla.png" alt="Zoopla" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/the-market.png" alt="OnTheMarket" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/rightmove.png" alt="Rightmove" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/sme-news.png" alt="SME News" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/my-deposit.png" alt="My Deposits" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-md shadow-sm h-24 p-2">
      <img src="/go-global.png" alt="Go Global Awards" className="max-h-14 w-auto object-contain" />
    </div>
  </div>
</div>












      {/* Bottom Bar */}
      <div className="bg-gray-100 py-4">
        <p className="text-center text-sm text-gray-500">
          © 2025 Lineas. All rights reserved.
        </p>
      </div>
            {/* Skyline Image */}
      <div className="w-full">
        <Image
          src="/footer-bg.png" // replace with your skyline image
          alt="London Skyline"
          width={1920}
          height={200}
          className="w-full h-auto"
        />
      </div>

    </footer>
  );
}
