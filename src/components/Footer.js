"use client";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import Link from "next/link";


export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("Please enter your email!");
      return;
    }

    setLoading(true);

    // simulate API request
    setTimeout(() => {
      setEmail(""); // clear input
      setLoading(false); // re-enable button
      toast.success("Subscribed successfully!");
    }, 2000);
  };
  return (
   <footer className="bg-[#F5F5F5]">
     <Toaster position="top-right" reverseOrder={false} />
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
      <li><Link href="/termandpolicy" className="hover:text-black dark:hover:text-white">Terms of Use</Link></li>
      <li><Link href="/privacypolicy" className="hover:text-black dark:hover:text-white">Privacy Policy</Link></li>
      <li><Link href="/contact" className="hover:text-black dark:hover:text-white">
    Contact Support
  </Link></li>
      <li><Link href="/complain" className="hover:text-black dark:hover:text-white">Complaints</Link></li>
      <li><Link href="/about" className="hover:text-black dark:hover:text-white">About</Link></li>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100 min-h-[40px]"
        />

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className={`px-4 py-2 min-h-[40px] whitespace-nowrap font-medium transition-colors rounded-lg sm:rounded-l-none sm:rounded-r-lg
            ${
              loading
                ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Subscribing...
            </div>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
  
  {/* Social Media */}
  <h4 className="font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">Follow Us</h4>
 <div className="flex flex-wrap gap-3 sm:gap-3">
  {/* Facebook */}
  <a 
  href="https://www.facebook.com/lineas.co.uk/" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
    <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </div>
</a>

  {/* TikTok */}
  <a 
  href="https://www.tiktok.com/" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-black to-gray-700 rounded-lg hover:from-gray-900 hover:to-black transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
    <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.04c-.51 0-1.02.04-1.52.12a10 10 0 1010.36 8.85c-.31.05-.63.08-.96.08a5.3 5.3 0 01-5.3-5.3V2.04A9.99 9.99 0 0012 2.04zm1.66 11.88a3.65 3.65 0 11-3.65-3.65c.34 0 .66.05.97.15v2.06a1.61 1.61 0 101.17 1.55V7.49h1.51c.21 1.07.92 1.97 1.87 2.47v1.58a3.65 3.65 0 01-1.87-.52v2.9z"/>
    </svg>
  </div>
  </a>

  {/* Instagram */}
  <a 
  href="https://www.instagram.com/lineas_estate_agent?igsh=MW0yYTlmN3BqMmoyMg%3D%3D" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-lg hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
    <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988c6.621 0 11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM15.971 12c0 2.188-1.783 3.972-3.971 3.972S8.029 14.188 8.029 12c0-2.188 1.783-3.972 3.971-3.972S15.971 9.812 15.971 12zM18.406 6.034c0 .568-.461 1.029-1.029 1.029s-1.029-.461-1.029-1.029.461-1.029 1.029-1.029 1.029.461 1.029 1.029z"/>
    </svg>
  </div>
  </a>

  {/* X (Twitter New) */}
  <a 
  href="https://x.com/lineasestate1?s=11" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-black to-gray-800 rounded-lg hover:from-gray-900 hover:to-black transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
    <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.433l-4.77-6.228-5.457 6.228H2.532l7.73-8.824L1.5 2.25h6.602l4.317 5.718 5.825-5.718z"/>
    </svg>
  </div>
  </a>

  {/* YouTube */}
   <a 
  href="https://www.youtube.com/@lineasestateagents3456" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
    <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a2.974 2.974 0 00-2.094-2.103C19.691 3.5 12 3.5 12 3.5s-7.691 0-9.404.583a2.974 2.974 0 00-2.094 2.103C0 8.21 0 12 0 12s0 3.79.502 5.814a2.974 2.974 0 002.094 2.103C4.309 20.5 12 20.5 12 20.5s7.691 0 9.404-.583a2.974 2.974 0 002.094-2.103C24 15.79 24 12 24 12s0-3.79-.502-5.814zM9.75 15.568V8.432L15.568 12 9.75 15.568z"/>
    </svg>
  </div>
  </a>
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
