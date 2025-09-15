"use client";
import React from "react";
import { MapPin, Bed, Bath, Users, Square, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AllProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Luxury 3-Bedroom Apartment with River Views",
      location: "London",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      price: "£1,450,000",
      period: "",
      beds: 3,
      baths: 2,
      sqft: 1450,
      badges: ["Featured", "For Sale"],
    },
    {
      id: 2,
      title: "Luxury Short Let Apartment in Mayfair -Test (Copy)",
      location: "London",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      price: "£20,040",
      period: "/monthly",
      beds: 2,
      baths: 2,
      reception: 2,
      sqft: 1200,
      badges: ["Featured", "Commercial"],
      energyRating: "EPC",
      fingerprint: "1 FP",
      status: "Under Offer",
    },
    {
      id: 3,
      title: "Luxury 3-Bedroom Apartment with River Views",
      location: "London",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      price: "£1,450,000",
      period: "",
      beds: 3,
      baths: 2,
      sqft: 1450,
      badges: ["Featured", "For Sale"],
    },
  ];

  const router = useRouter();

   const FilterPage=()=>{
      router.push('propertydetails')
    }

  const PropertyCard = ({ property }) => {
    const handleCardClick = () => {
      // Use query parameters instead of dynamic routes for static export
      router.push(`/property?id=${property.id}`);
    };

    return (
      <div 
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover"
          />

          {/* Top left badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {property.badges.map((badge, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-md text-xs font-medium flex items-center ${
                  badge === "Featured"
                    ? "bg-orange-500 text-white"
                    : badge === "Commercial"
                    ? "bg-purple-500 text-white"
                    : badge === "For Sale"
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                <Star className="w-3 h-3 mr-1" />
                {badge}
              </span>
            ))}
          </div>

          {/* Status badge */}
          {property.status && (
            <div className="absolute top-3 right-3">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                📋 {property.status}
              </span>
            </div>
          )}
        </div>

        <div className="p-5 bg-amber-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
            {property.title}
          </h3>

          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>

          {/* Property details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            {property.beds && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1 text-blue-500" />
                <span>{property.beds} beds</span>
              </div>
            )}
            {property.baths && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1 text-blue-500" />
                <span>{property.baths} baths</span>
              </div>
            )}
            {property.reception && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-blue-500" />
                <span>{property.reception} rec</span>
              </div>
            )}
            {property.sqft && (
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1 text-blue-500" />
                <span>{property.sqft} sqft</span>
              </div>
            )}
          </div>

          <div className="text-2xl font-bold text-cyan-700">
            {property.price}
            {property.period && (
              <span className="text-sm font-normal text-gray-600 ml-1">
                {property.period}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-full px-4 lg:px-12 py-12 border-y border-transparent dark:border-y-white"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
  <h2 className="text-2xl lg:text-3xl font-semibold relative inline-block"
      style={{ color: "var(--foreground)" }}>
    All Properties
    <span className="absolute left-0 -bottom-3 w-20 h-[3px] bg-cyan-400"></span>
  </h2>
  <p className="text-base lg:text-lg max-w-2xl mt-6"
     style={{ color: "var(--foreground)" }}>
    Explore our complete collection of properties, featuring a wide
            range of options to suit every lifestyle, budget, and investment
            goal.
  </p>
</div>
        <button 
        onClick={FilterPage}
          className="hover:text-cyan-500 font-semibold flex items-center transition-colors duration-200 text-sm lg:text-base"
          style={{ color: "var(--foreground)" }}
        >
          View all properties 
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-1" />
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default AllProperties;