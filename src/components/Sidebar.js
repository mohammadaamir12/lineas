"use client";
import { Home, User, Heart, Eye, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 shadow-md bg-white  h-screen p-0 flex flex-col justify-between">
        
      <div>
        <div className=" p-6">
      <img
        src="/logo3.png"      // Path to your logo
        alt="LINEAS Logo"
        className="w-32 h-auto" // Adjust width/height as needed
      />
    </div>
  
       <div className="flex items-start gap-2 bg-[#EEF2FF] w-full p-4">
  {/* Avatar with online indicator */}
  <div className="relative flex-shrink-0">
    <div className="w-15 h-15 bg-blue-600 rounded-full flex items-center justify-center">
      <span className="text-white text-2xl font-medium">S</span>
    </div>
    <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
  </div>

  {/* User info */}
  <div>
    <h1 className="text-lg font-semibold text-gray-900">
      shanti
    </h1>
    <p className="text-gray-600 text-sm ">
      shantirana210@gma...
    </p>
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
      <span className="text-blue-600 font-medium text-sm">Online</span>
    </div>
  </div>
</div>
  
        <nav className="space-y-2 p-4">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 text-blue-600 font-medium">
            <Home size={20} /> Dashboard
          </Link>
          <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
            <User size={20} /> Profile
          </Link>
          <Link href="/favorites" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
            <Heart size={20} /> Favorites
          </Link>
          <Link href="/requests" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
            <Eye size={20} /> Viewing Requests
          </Link>
          <Link href="/settings" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </div>
       <div className="border-t bg-[#F9FAFB] border-gray-200 ">
      <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium p-6">
        <LogOut size={18} /> Sign Out
      </button>
      </div>
    </div>
  );
}
