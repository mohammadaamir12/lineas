"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Users,
  Square,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";

const LatestProperties = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 👇 Replace with your "Latest Properties" data
  const originalProperties = [
    {
      id: 1,
      title: "Cozy 2-Bed Apartment in Shoreditch",
      location: "London",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=400&fit=crop",
      price: "£3,200",
      period: "/monthly",
      beds: 2,
      baths: 1,
      sqft: 950,
      badges: ["Latest", "For Rent"],
    },
    {
      id: 2,
      title: "Modern Loft Studio in Soho",
      location: "London",
      image:
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&h=400&fit=crop",
      price: "£2,100",
      period: "/monthly",
      beds: 1,
      baths: 1,
      sqft: 700,
      badges: ["Latest", "For Rent"],
    },
    {
      id: 3,
      title: "Stylish Family Home with Garden",
      location: "Manchester",
      image:
        "https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&h=400&fit=crop",
      price: "£485,000",
      period: "",
      beds: 3,
      baths: 2,
      sqft: 1600,
      badges: ["Latest", "For Sale"],
    },
    {
      id: 4,
      title: "Luxury Townhouse in Chelsea",
      location: "London",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
      price: "£1,850,000",
      period: "",
      beds: 4,
      baths: 3,
      sqft: 2200,
      badges: ["Latest", "For Sale"],
    },
    {
      id: 5,
      title: "Riverside Flat with Balcony",
      location: "Liverpool",
      image:
        "https://images.unsplash.com/photo-1600585152915-d67e4c3a8d0e?w=600&h=400&fit=crop",
      price: "£1,750",
      period: "/monthly",
      beds: 2,
      baths: 1,
      sqft: 1000,
      badges: ["Latest", "For Rent"],
    },
  ];

  // Create infinite loop by duplicating properties for desktop
  const properties = isMobile
    ? originalProperties
    : [...originalProperties, ...originalProperties, ...originalProperties];

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        setCurrentSlide((prev) => (prev + 1) % originalProperties.length);
      } else {
        setCurrentSlide((prev) => {
          const maxSlide = properties.length - 3;
          if (prev >= maxSlide) {
            return 0; // Reset
          }
          return prev + 1;
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [originalProperties.length, properties.length, isMobile]);

  const nextSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev + 1) % originalProperties.length);
    } else {
      setCurrentSlide((prev) => {
        const maxSlide = properties.length - 3;
        if (prev >= maxSlide) {
          return 0;
        }
        return prev + 1;
      });
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrentSlide(
        (prev) => (prev - 1 + originalProperties.length) % originalProperties.length
      );
    } else {
      setCurrentSlide((prev) => {
        const maxSlide = properties.length - 3;
        if (prev <= 0) {
          return maxSlide;
        }
        return prev - 1;
      });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

   const router = useRouter();
    const FilterPage=()=>{
      router.push('propertydetails')
    }

  const PropertyCard = ({ property }) => {
    const handleCardClick = () => {
      // Use query parameters instead of dynamic routes for static export
      router.push(`/property?id=${property.id}`);
    };
    return(
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mx-2"
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
                badge === "Latest"
                  ? "bg-green-600 text-white"
                  : badge === "For Rent"
                  ? "bg-blue-500 text-white"
                  : badge === "For Sale"
                  ? "bg-red-500 text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              <Star className="w-3 h-3 mr-1" />
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-sm font-medium">{property.location}</span>
        </div>

        {/* Property details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
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
          {property.sqft && (
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1 text-blue-500" />
              <span>{property.sqft} sqft</span>
            </div>
          )}
        </div>

        <div className="text-2xl font-bold text-gray-900">
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
}

  return (
    <div
      className="w-full px-4 lg:px-12 py-12 
             border-y border-transparent 
             dark:border-y-white"
      style={{
        backgroundColor: "var(--background)",
        // borderColor: "var(--foreground, #e2e8f0)",
        // borderOpacity: 0.2,
      }}
    >
      {/* Header */}
     <div className="flex flex-col lg:flex-row justify-between items-start mb-10">
  {/* <div>
    <h2
      className="text-2xl lg:text-3xl font-semibold relative inline-block"
      style={{ color: "var(--foreground)" }}
    >
      Latest Properties
      <span className="absolute left-0 -bottom-3 w-20 h-[3px] bg-cyan-400"></span>
    </h2>
    <p
      className="text-base lg:text-lg max-w-2xl mt-6"
      style={{ color: "var(--foreground)" }}
    >
      Discover the newest listings added to our platform – fresh homes,
      apartments, and investments waiting for you.
    </p>
  </div> */}
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>
      <h1 style={{ margin: 0, fontSize: '38px', fontWeight:'550', display: 'flex', alignItems: 'baseline' }}>
        <span style={{ color: '#000',marginRight:10 }}>Latest</span>
        <span style={{ color: '#0FC6D6', alignItems:'center'}}>
            Properties
          <hr style={{ border: '2px solid #D3F1F8', width: '100%', marginTop: '1px',borderRadius:10 }} />
        </span>
      </h1>
      <p
      className="text-base lg:text-lg max-w-2xl mt-6"
      style={{ color: "var(--foreground)" }}
    >
      Discover the newest listings added to our platform – fresh homes,
      apartments, and investments waiting for you.
    </p>
    </div>

  {/* Button below text on mobile, right side on desktop */}
  <button
    onClick={FilterPage}
    className="mt-6 lg:mt-0 hover:text-cyan-300 font-semibold flex items-center transition-colors duration-200 text-sm lg:text-base"
    style={{ color: "var(--foreground)" }}
  >
    View all latest
    <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-1" />
  </button>
</div>


      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
        </button>

        {/* Properties Container */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: isMobile
                ? `translateX(-${currentSlide * 100}%)`
                : `translateX(-${currentSlide * (100 / 3)}%)`,
            }}
          >
            {properties.map((property, index) => (
              <div
                key={`${property.id}-${index}`}
                className={`flex-shrink-0 px-2 ${
                  isMobile ? "w-full" : "w-1/3"
                }`}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {originalProperties.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                (isMobile
                  ? index === currentSlide
                  : index === currentSlide % originalProperties.length)
                  ? "bg-cyan-500 w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestProperties;
