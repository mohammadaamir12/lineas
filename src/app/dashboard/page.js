"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import QuickActionCard from "@/components/QuickActionCard";
import Navbar from "@/components/Navbar";
import { Heart, Eye, UserRound, RefreshCcw } from "lucide-react";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard"); // 👈 add this

  const handleRefresh = () => {
    console.log("Refreshing dashboard...");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform bg-white transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <Sidebar activeTab={activeTab}/>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* 👇 pass activeTab to Navbar */}
        <Navbar
          activeTab={activeTab}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onRefresh={handleRefresh}
        />

        <main className="flex-1 p-4 sm:p-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
  {/* Heading Section */}
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome back, Shanti!</h1>
<h2 className="text-base sm:text-lg font-normal text-gray-600">
  {"Here's what's happening with your account"}
</h2>
  </div>
  {/* Refresh Button */}
  <button
    className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 mt-4 sm:mt-0"
    onClick={handleRefresh}
  >
    <RefreshCcw size={18} /> Refresh
  </button>
</div>


          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <DashboardCard icon={Heart} title="Favorite Properties" value="1" color="#FEF2F3" subColor="red" />
            <DashboardCard icon={Eye} title="Viewing Requests" value="0" color="#EEF6FF" subColor="blue"/>
            <DashboardCard icon={UserRound} title="Profile Completion" value="75%" color="#F0FDF4" subColor="green"/>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="bg-white rounded-lg shadow-sm ">
        <div className="flex items-center justify-between p-6 ">
          <h2 className="text-lg font-semibold">Recent Viewing Requests</h2>
          <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-700">
            View all
          </a>
        </div>
        <div className="border-b border-gray-200"></div>
        <div className="flex flex-col items-center justify-center text-gray-500 py-10">
          <Eye size={64} className="mb-3 text-gray-400" strokeWidth={1.5} />
          <p className="text-gray-600 mb-2">No viewing requests yet</p>
          <a href="#" className="text-blue-600 font-medium mt-2 flex items-center gap-1">
            Browse Properties <span>→</span>
          </a>
        </div>
      </div>

            {/* Right */}
            <div className="bg-white rounded-lg shadow-sm  border border-gray-100">
              <h2 className="text-lg font-semibold p-6">Quick Actions</h2>
              <div className="border-b border-gray-200 mb-4"></div>
              <div className="space-y-3 p-6">
                <QuickActionCard icon={Eye} title="Browse Properties" subtitle="Find your dream home" color="#EEF6FF"  subColor="#deecfc" iconColor='blue' />
                <QuickActionCard icon={Heart} title="My Favorites" subtitle="1 saved properties" color="#FEF2F3" subColor="#ffe8ea" iconColor='red'/>
                <QuickActionCard icon={UserRound} title="Update Profile" subtitle="Manage your account settings" color="#F0FDF4" iconColor='green'/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
