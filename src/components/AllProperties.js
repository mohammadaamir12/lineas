"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapPin, Bed, Bath, Users, Square, Star, ChevronRight,BuildingIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const AllProperties = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [propertiesData, setPropertiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const router = useRouter();

  // Static properties as fallback
  const fallbackProperties = [
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

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://test-demo.in/lineasapi/api/v1/getwebsiteallproperty", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (result.STATUS_CODE === "LS000" && result.STATUS === "SUCCESS") {
          console.log("API DATA:", result.DATA);
          
          if (result.DATA && Array.isArray(result.DATA) && result.DATA.length > 0) {
            const mappedProperties = result.DATA.map((property, index) => {
              console.log(`Mapping property ${index}:`, property);
              
              return {
                id: property.id || index + 1,
                title: property.title || "Untitled Property",
                location: property.city && property.state 
                  ? `${property.city}, ${property.state}` 
                  : property.city || property.state || "Location not specified",
                image: property.property_image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
                price: property.price ? `£${property.price}` : "Price on request",
                period: property.price_interval ? `/${property.price_interval.toLowerCase()}` : "",
                beds: parseInt(property.bedrooms) || 0,
                baths: parseInt(property.bathrooms) || parseInt(property.baths) || 0,
                reception: parseInt(property.reception_rooms) || 0,
                sqft: parseInt(property.square_footage) || 0,
                badges: [
                  property.category,
                  property.property_flag === "featured" ? "Featured" : "",
                  property.property_status === "for_sale" ? "For Sale" : "",
                  property.property_status === "for_rent" ? "For Rent" : ""
                ].filter(Boolean),
                energyRating: property.epc_certificate ? "EPC" : "",
                fingerprint: property.fingerprint || "",
                status: property.property_status === "available" 
                  ? "Available" 
                  : property.property_status === "under_offer" 
                  ? "Under Offer"
                  : property.property_status || ""
              };
            });
            
            console.log("Mapped properties:", mappedProperties);
            setPropertiesData(mappedProperties);
            setError(null);
          } else {
            console.warn("No valid properties data received");
            setPropertiesData(fallbackProperties);
            setError("No properties available from API, showing default properties");
          }
        } else {
          console.error("API returned error:", result);
          setPropertiesData(fallbackProperties);
          setError(`API Error: ${result.MESSAGE || 'Unknown error'}, showing default properties`);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setPropertiesData(fallbackProperties);
        setError(`Network Error: ${err.message}, showing default properties`);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const FilterPage = () => {
    router.push("propertydetails");
  };

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after animation triggers
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const PropertyCard = ({ property }) => {
    const handleCardClick = () => {
      const queryParams = new URLSearchParams({
        id: property.id,
        title: property.title,
        location: property.location,
        image: property.image,
        price: property.price,
        period: property.period || '',
        beds: property.beds || 0,
        baths: property.baths || 0,
        reception: property.reception || 0,
        sqft: property.sqft || 0,
        badges: JSON.stringify(property.badges || []),
        energyRating: property.energyRating || '',
        fingerprint: property.fingerprint || '',
        status: property.status || ''
      });
      
      router.push(`/property?${queryParams.toString()}`);
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
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop";
            }}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {property.badges.map((badge, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-md text-xs font-medium flex items-center ${
                 badge === "Latest"
                    ? "bg-orange-500 text-white"
                    : badge === "Commercial"
                    ? "bg-purple-500 text-white"
                    : badge === "For Sale"
                    ? "bg-blue-500 text-white":
                    badge === "Short Let"
                    ? "bg-orange-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                <Star className="w-3 h-3 mr-1" />
                {badge}
              </span>
            ))}
          </div>
          {property.status && (
            <div className="absolute top-3 right-3">
              <span className={`${
  property.status === "Available"
    ? "bg-green-500"
    : "bg-red-500"
} text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1`}>
  <BuildingIcon className="w-3 h-3" /> {property.status}
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
      ref={sectionRef}
      className="w-full px-4 lg:px-12 py-12 border-y border-transparent dark:border-y-white"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-between items-start mb-10">
        <div style={{ fontFamily: "Arial, sans-serif", color: "#2c3e50" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "38px",
              fontWeight: 500,
              fontFamily: "Poppins, sans-serif",
              lineHeight: "38px",
              color: "rgb(51, 51, 51)",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span style={{ color: "#000", marginRight: 10 }}>All</span>
            <span style={{ color: "#0FC6D6", alignItems: "center" }}>
              Properties
              <hr
                style={{
                  border: "2px solid #D3F1F8",
                  width: "100%",
                  marginTop: "1px",
                  borderRadius: 10,
                }}
              />
            </span>
          </h1>
          <p
            className="text-base lg:text-lg max-w-2xl mt-6"
            style={{ color: "var(--foreground)" }}
          >
            Explore our complete collection of properties, featuring a wide range
            of options to suit every lifestyle, budget, and investment goal.
          </p>
        </div>
        <button
          onClick={FilterPage}
          className="mt-6 lg:mt-0 hover:text-cyan-500 font-semibold flex items-center transition-colors duration-200 text-sm lg:text-base"
          style={{ color: "var(--foreground)" }}
        >
          View all properties
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-1" />
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="relative w-12 h-12">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-3 bg-gray-600 rounded-full"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-14px)`,
                  animation: `fade-spinner 1s linear infinite`,
                  animationDelay: `${-1.2 + i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-spinner {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>

      {!loading && (
        <div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.5)",
            transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {propertiesData.slice(0, 3).map((property, index) => (
            <div
              key={property.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.5)",
                transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: `${index * 300}ms`,
              }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProperties;