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
<div className="dark:bg-[#1D283C] dark:text-gray-300 p-4 sm:p-6 rounded">
  <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Sign Up for Our Newsletter</h4>
  
  {/* Email Subscription */}
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
    <input
      type="email"
      placeholder="Your email"
      className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100 min-h-[40px]"
    />
    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-gray-800 transition-colors font-medium min-h-[40px] whitespace-nowrap">
      Subscribe
    </button>
  </div>
  
  {/* Social Media */}
  <h4 className="font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">Follow Us</h4>
  <div className="flex flex-wrap gap-3 sm:gap-3">
    {/* Facebook */}
    <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
      <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </div>
    
    {/* Twitter */}
    <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg hover:from-sky-500 hover:to-sky-700 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
      <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    </div>
    
    {/* Instagram */}
    <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-lg hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
      <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988c6.621 0 11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM15.971 12c0 2.188-1.783 3.972-3.971 3.972S8.029 14.188 8.029 12c0-2.188 1.783-3.972 3.971-3.972S15.971 9.812 15.971 12zM12 7.578c-2.442 0-4.422 1.98-4.422 4.422S9.558 16.422 12 16.422s4.422-1.98 4.422-4.422S14.442 7.578 12 7.578zM18.406 6.034c0 .568-.461 1.029-1.029 1.029s-1.029-.461-1.029-1.029.461-1.029 1.029-1.029 1.029.461 1.029 1.029z"/>
      </svg>
    </div>
    
    {/* LinkedIn */}
    <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
      <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </div>
  </div>
</div>
</div>

<div className="py-6 px-4 lg:px-20">
  <div className="grid grid-cols-3 md:grid-cols-12 gap-1">
    {/* Row 1 (desktop: 4 logos, mobile: 3 logos in first row) */}
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
      <img src="/prs.png" alt="PRS" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
      <img src="/approved-code.png" alt="Approved Code" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
      <img src="/ico.png" alt="ICO" className="max-h-14 w-auto object-contain" />
    </div>

    {/* AllAgents → full width on mobile, wide on desktop */}
    <div className="col-span-3 md:col-span-6 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
      <img src="/all-agents.png" alt="All Agents" className="max-h-14 w-auto object-contain" />
    </div>

    {/* Row 2 (6 logos, mobile: 3 per row) */}
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
      <img src="/zoopla.png" alt="Zoopla" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
      <img src="/the-market.png" alt="OnTheMarket" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
      <img src="/rightmove.png" alt="Rightmove" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
      <img src="/sme-news.png" alt="SME News" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
      <img src="/my-deposit.png" alt="My Deposits" className="max-h-14 w-auto object-contain" />
    </div>
    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-sm shadow-sm h-24 p-1">
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
