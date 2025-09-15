// components/LatestInsights.jsx
"use client";

import React from "react";
import {  ChevronRight, } from 'lucide-react';

const insights = [
  {
    id: 1,
    title: "UK Housing Market Trends 2025",
    date: "Aug 25, 2025",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
    excerpt:
      "Explore the latest updates in the UK housing market and what buyers and sellers should expect this year.",
  },
  {
    id: 2,
    title: "Top 5 Tips for First-Time Buyers",
    date: "Aug 20, 2025",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    excerpt:
      "Buying your first property can feel overwhelming. Here are five essential tips to make the process easier.",
  },
  {
    id: 3,
    title: "How to Maximise Rental Income",
    date: "Aug 15, 2025",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d6c2d6?w=600&h=400&fit=crop",
    excerpt:
      "Landlords, discover practical strategies to improve your rental yields and attract long-term tenants.",
  },
];

const LatestInsights = () => {
  return (
    <div
      className="w-full px-4 lg:px-12 py-12"
      style={{ backgroundColor: "var(--background)" }}
    >
          {/* Header */}
<div className="flex flex-col lg:flex-row justify-between items-start mb-10">
  <div>
    <h2
      className="text-2xl lg:text-3xl font-semibold relative inline-block"
      style={{ color: "var(--foreground)" }}
    >
      Latest Insights
      <span className="absolute left-0 -bottom-3 w-20 h-[3px] bg-cyan-400"></span>
    </h2>
    <p
      className="text-base lg:text-lg max-w-2xl mt-6"
      style={{ color: "var(--foreground)" }}
    >
      Explore fresh perspectives, expert opinions, and valuable knowledge from
      our team and industry leaders.
    </p>
  </div>

  {/* Button below text on mobile, right side on desktop */}
  <button
    className="mt-6 lg:mt-0 hover:text-cyan-500 font-semibold flex items-center transition-colors duration-200 text-sm lg:text-base"
    style={{ color: "var(--foreground)" }}
  >
    View More Insights
    <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-1" />
  </button>
</div>


      {/* Cards Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {insights.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestInsights;
