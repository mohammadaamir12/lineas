"use client";
import { Menu, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Navbar({ onMenuToggle, onRefresh,activeTab }) {
  return (
    <header className="flex justify-between items-center bg-white border-b border-gray-200 px-4 sm:px-6 py-4 shadow-sm sticky top-0 z-20">
  {/* Left Section */}
  <div className="flex items-center gap-3">
    {/* Menu Button for mobile */}
    <button
      className="md:hidden text-gray-700 hover:text-gray-900"
      onClick={onMenuToggle}
    >
      <Menu size={22} />
    </button>

    {/* Dynamic active tab title */}
    <h1 className="text-lg font-semibold text-gray-800 capitalize">
      {activeTab}
    </h1>
  </div>

  {/* Right Section */}
  <div className="flex items-center gap-4">
    <Link
      href="/"
      className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm font-medium"
    >
      <ArrowLeft size={18} />
      Back to Home
    </Link>

   <div className="md:hidden w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full font-semibold">
  S
</div>
  </div>
</header>

  );
}
