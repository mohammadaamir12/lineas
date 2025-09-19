

"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Users, Square, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const LatestProperties = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSlides, setActiveSlides] = useState([]);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const autoSlideRef = useRef(null);
  const router = useRouter();

  // Properties data
   const originalProperties = [
    {
      id: 1,
      title: "Cozy 2-Bed Apartment in Shoreditch",
      location: "London",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=400&fit=crop",
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
      image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&h=400&fit=crop",
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
      image: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&h=400&fit=crop",
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
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
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
      image: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&h=400&fit=crop",
      price: "£1,750",
      period: "/monthly",
      beds: 2,
      baths: 1,
      sqft: 1000,
      badges: ["Latest", "For Rent"],
    },
  ];

  const totalOriginal = originalProperties.length;
  const properties = isMobile
    ? originalProperties
    : Array(10).fill(originalProperties).flat();
  const slidesToShow = isMobile ? 1 : 3;

  // Initialize active slides based on currentIndex
  useEffect(() => {
    const initialSlides = [];
    for (let i = 0; i < slidesToShow; i++) {
      initialSlides.push((currentIndex + i) % totalOriginal);
    }
    setActiveSlides(initialSlides);
  }, [currentIndex, slidesToShow, totalOriginal]);

  // Check mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for visibility - Same as Awards
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
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

  // Initialize carousel position
  useEffect(() => {
    setCurrentIndex(isMobile ? 0 : totalOriginal * 2);
  }, [isMobile, totalOriginal]);

  // Auto-slide functionality
  useEffect(() => {
    if (!isVisible) return;

    autoSlideRef.current = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % properties.length);
      }
    }, 5000);

    return () => clearInterval(autoSlideRef.current);
  }, [isVisible, isTransitioning, properties.length]);

  // Handle transition end and update active slides
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      const newActiveSlides = [];
      for (let i = 0; i < slidesToShow; i++) {
        newActiveSlides.push((currentIndex + i) % totalOriginal);
      }
      setActiveSlides(newActiveSlides);
    };

    carousel.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      carousel.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [currentIndex, slidesToShow, totalOriginal]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  }, [isTransitioning, properties.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
  }, [isTransitioning, properties.length]);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(isMobile ? index : totalOriginal * 2 + index);
    },
    [isTransitioning, isMobile, totalOriginal]
  );

  // Pause auto-slide on hover
  const handleMouseEnter = () => clearInterval(autoSlideRef.current);
  const handleMouseLeave = () => {
    if (isVisible) {
      autoSlideRef.current = setInterval(() => {
        if (!isTransitioning) {
          setIsTransitioning(true);
          setCurrentIndex((prev) => (prev + 1) % properties.length);
        }
      }, 5000);
    }
  };

  // Navigation to property details
  const FilterPage = () => router.push("propertydetails");

  // Get current slide indicator
  const getCurrentSlideIndicator = () => currentIndex % totalOriginal;

  // Calculate which cards should have staggered animation
  const getCardAnimationIndex = (index) => {
    // For the first 3 cards (desktop) or first card (mobile), give them staggered delays
    if (index < slidesToShow) {
      return index;
    }
    // For all other cards, use the same pattern based on their position
    return index % slidesToShow;
  };

  // PropertyCard component with Awards-style staggered animation
  const PropertyCard = React.memo(function PropertyCard({ property, index }) {
    const handleCardClick = () => router.push(`/property?id=${property.id}`);
    const animationIndex = getCardAnimationIndex(index);
    
    return (
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mx-2 cursor-pointer will-change-transform flex flex-col"
        onClick={handleCardClick}
        style={{
          minHeight: "400px",
          // Same animation style as Awards component
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1) translateY(0)" : "scale(0.8) translateY(30px)",
          transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          // Staggered delay exactly like Awards component
          transitionDelay: `${400 + (animationIndex * 200)}ms`,
        }}
      >
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {property.badges?.map((badge, badgeIndex) => (
              <span
                key={`${property.id}-${badgeIndex}`}
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
          {property.status && (
            <div className="absolute top-3 right-3">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                📋 {property.status}
              </span>
            </div>
          )}
          <div className="absolute bottom-3 right-3 flex gap-2">
            {property.fingerprint && (
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                👆 {property.fingerprint}
              </span>
            )}
            {property.energyRating && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                🏠 {property.energyRating}
              </span>
            )}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3
            className="text-lg font-bold text-gray-900 mb-3 leading-tight truncate"
            title={property.title}
          >
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>
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
          <div className="text-2xl font-bold text-gray-900 mt-auto">
            {property.price}
            {property.period && (
              <span className="text-sm font-normal text-gray-600 ml-1">{property.period}</span>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div
        ref={sectionRef}
        className="w-full px-4 lg:px-12 py-12 border-y border-transparent dark:border-y-white"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Header with same animation as Awards */}
         <div
        className="flex flex-col lg:flex-row justify-between items-start mb-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
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
            <span style={{ color: "#000", marginRight: 10 }}>Latest</span>
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
          <p className="text-base lg:text-lg max-w-2xl mt-6" style={{ color: "var(--foreground)" }}>
            Discover our newest property listings, freshly added to the market with the most up-to-date features and pricing.
          </p>
        </div>
        <button
          onClick={FilterPage}
          className="mt-6 lg:mt-0 hover:text-cyan-500 font-semibold flex items-center transition-colors duration-200 text-sm lg:text-base"
          style={{ color: "var(--foreground)" }}
        >
          View all featured
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-1" />
        </button>
      </div>

        {/* Carousel container with same animation as Awards */}
        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.5)",
            transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "200ms",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ willChange: "transform" }}
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ willChange: "transform" }}
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
          </button>
          <div className="overflow-hidden rounded-xl">
            <div
              ref={carouselRef}
              className="flex"
              style={{
                transform: `translate3d(-${(currentIndex * 100) / slidesToShow}%, 0, 0)`,
                transition: isTransitioning ? "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
                willChange: "transform",
              }}
            >
              {properties.map((property, index) => (
                <div
                  key={`${property.id}-${Math.floor(index / totalOriginal)}-${index % totalOriginal}`}
                  className={`flex-shrink-0 px-2 ${isMobile ? "w-full" : "w-1/3"}`}
                >
                  <PropertyCard property={property} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Indicators with same animation as Awards */}
          <div
            className="flex justify-center mt-8 gap-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: "400ms",
            }}
          >
            {originalProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`h-2 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  index === getCurrentSlideIndicator() ? "bg-cyan-500 w-8" : "bg-gray-300 hover:bg-gray-400 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProperties;