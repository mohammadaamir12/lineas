"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Users, Square, Star,Building } from "lucide-react";
import { useRouter } from "next/navigation";

const LatestProperties = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSlides, setActiveSlides] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const autoSlideRef = useRef(null);
  const router = useRouter();

  // Drag handling state - IMPROVED
  const dragStartXRef = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragThresholdReached = useRef(false);
  const clickStartTime = useRef(null);

  // Static properties as fallback
  const originalProperties = [
    {
      id: 1,
      title: "Luxury Short Let Apartment in Mayfair",
      location: "London",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      price: "£20,040",
      period: "/monthly",
      beds: 2,
      baths: 2,
      reception: 2,
      sqft: 1200,
      badges: ["Featured", "Commercial"],
      energyRating: "EPC",
      fingerprint: "1 FP",
    },
    {
      id: 2,
      title: "Luxury Short Let Apartment in Mayfair",
      location: "London",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      price: "£20,040",
      period: "/monthly",
      beds: 3,
      baths: 1,
      reception: 4,
      sqft: 1200,
      badges: ["Featured", "Commercial"],
      energyRating: "EPC",
      fingerprint: "1 FP",
      status: "Under Offer",
    },
    {
      id: 3,
      title: "Luxury 3-Bedroom Apartment with River",
      location: "London",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      price: "£1,450,000",
      period: "",
      beds: 3,
      baths: 2,
      sqft: 1450,
      badges: ["Featured", "For Sale"],
    },
    {
      id: 4,
      title: "Modern Penthouse in Central London",
      location: "London",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      price: "£2,850,000",
      period: "",
      beds: 4,
      baths: 3,
      reception: 1,
      sqft: 2200,
      badges: ["Featured", "For Sale"],
    },
    {
      id: 5,
      title: "Executive Studio in Canary Wharf",
      location: "London",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop",
      price: "£15,500",
      period: "/monthly",
      beds: 1,
      baths: 1,
      sqft: 850,
      badges: ["Featured", "Commercial"],
    },
  ];

  // Use API data if available, otherwise fallback to static data
  const currentProperties = propertiesData.length > 0 ? propertiesData : originalProperties;
  const totalOriginal = currentProperties.length;
  const properties = isMobile ? currentProperties : Array(10).fill(currentProperties).flat();
  const slidesToShow = isMobile ? 1 : 3;

  // Fetch properties from API
   useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://test-demo.in/lineasapi/api/v1/getwebsitelatestproperty", {
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
  const mappedProperties = result.DATA.map((property, index) => ({
  id: property.id || index + 1,
  property_id: property.property_id || "",
  title: property.title || "Untitled Property",
  description: property.description || "",
  location: property.city && property.state
    ? `${property.city}, ${property.state}`
    : property.city || property.state || "Location not specified",
  address: property.address || "",
  postcode: property.postcode || "",
  latitude: property.latitude || null,
  longitude: property.longitude || null,
  image: property.property_image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  gallery_images: Array.isArray(property.gallery_images)
    ? property.gallery_images.map(img => img.gallery_image || "")
    : [],
  property_video: property.property_video || null,
  price: property.price ? `£${property.price}` : "Price on request",
  period: property.price_interval ? `/${property.price_interval.toLowerCase()}` : "",
  beds: parseInt(property.bedrooms) || 0,
  baths: parseInt(property.bathrooms) || parseInt(property.baths) || 0,
  reception: parseInt(property.reception_rooms) || 0,
  sqft: parseInt(property.square_footage) || 0,
  area_size: parseInt(property.area_size) || 0,
  badges: [
    property.category,
    property.property_flag === "latest" ? "Latest" : "",
    property.property_status === "for_sale" ? "For Sale" : "",
    property.property_status === "for_rent" ? "For Rent" : ""
  ].filter(Boolean),
  epc_certificate: property.epc_certificate || "",
  floor_plans: Array.isArray(property.floor_plans)
    ? property.floor_plans.map(plan => ({
        floor_name: plan.floor_name || "",
        square_footage: parseInt(plan.square_footage) || 0,
        floor_plan_image: plan.floor_plan_image || ""
      }))
    : [],
  floor_plan_image: property.floor_plan_image || "",
  fingerprint: property.fingerprint || "",
  status_color: property.status_color || "",
  status: property.property_status === "available"
    ? "Available"
    : property.property_status === "under_offer"
    ? "Under Offer"
    : property.property_status || "",
  added_by: property.added_by || "",
  add_date: property.add_date || ""
}));


  console.log("Mapped properties:", mappedProperties);
  setPropertiesData(mappedProperties);
  setError(null);
}
 else {
            console.warn("No valid properties data received");
            setError("No properties available from API, showing default properties");
          }
        } else {
          console.error("API returned error:", result);
          setError(`API Error: ${result.MESSAGE || 'Unknown error'}, showing default properties`);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`Network Error: ${err.message}, showing default properties`);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Auto-slide helpers
  const stopAutoSlide = useCallback(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setIsTransitioning(true);
        const nextIndex = prev + 1;
        // Handle infinite loop for desktop
        if (!isMobile && nextIndex >= properties.length - slidesToShow) {
          return totalOriginal * 2;
        }
        return nextIndex % properties.length;
      });
    }, 5000);
  }, [properties.length, stopAutoSlide, isMobile, slidesToShow, totalOriginal]);

  // Navigation functions - IMPROVED
  const nextSlide = useCallback(() => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (!isMobile && nextIndex >= properties.length - slidesToShow) {
        // Seamless loop
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(totalOriginal * 2);
          setTimeout(() => setIsTransitioning(true), 50);
        }, 400);
      }
      return nextIndex;
    });
  }, [isTransitioning, isDragging, properties.length, isMobile, slidesToShow, totalOriginal]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      if (!isMobile && prevIndex < totalOriginal) {
        // Seamless loop
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(totalOriginal * 2);
          setTimeout(() => setIsTransitioning(true), 50);
        }, 400);
      }
      return prevIndex < 0 ? properties.length - 1 : prevIndex;
    });
  }, [isTransitioning, isDragging, properties.length, isMobile, totalOriginal]);

  // Drag event handlers - COMPLETELY REWRITTEN FOR SMOOTH SCROLLING
  const handleDragStart = useCallback((e) => {
    if (isTransitioning) return;
    const clientX = e.type === "touchstart" ? e.targetTouches[0].clientX : e.clientX;
    dragStartXRef.current = clientX;
    clickStartTime.current = Date.now();
    setDragOffset(0);
    setIsDragging(false); // Don't set to true immediately
    dragThresholdReached.current = false;
    stopAutoSlide();
    e.preventDefault();
  }, [isTransitioning, stopAutoSlide]);

  const handleDragMove = useCallback((e) => {
    if (dragStartXRef.current === null) return;
    
    const clientX = e.type === "touchmove" ? e.targetTouches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartXRef.current;
    
    // Only consider it a drag if moved more than 5px
    if (Math.abs(deltaX) > 5) {
      setIsDragging(true);
      // Apply drag offset directly without limits for smooth follow
      setDragOffset(deltaX);
      
      // Check if threshold is reached
      const threshold = 50;
      if (Math.abs(deltaX) > threshold) {
        dragThresholdReached.current = true;
      }
    }
  }, []);

const handleDragEnd = useCallback(() => {
    if (!isDragging) {
      // Quick click - reset states
      dragStartXRef.current = null;
      clickStartTime.current = null;
      dragThresholdReached.current = false;
      
      // Resume auto-slide
      setTimeout(() => {
        if (isVisible) {
          startAutoSlide();
        }
      }, 500);
      return;
    }
    
    setIsDragging(false);
    
    // Calculate card width based on viewport
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    const cardWidth = carousel.offsetWidth / slidesToShow;
    const draggedCards = Math.round(Math.abs(dragOffset) / cardWidth);
    
    // Threshold: move to next/prev card if dragged more than 30% of card width
    const threshold = cardWidth * 0.3;
    const shouldSlide = Math.abs(dragOffset) > threshold;

    if (shouldSlide) {
      // Calculate how many cards to move (at least 1)
      const cardsToMove = draggedCards > 0 ? draggedCards : 1;
      
      setIsTransitioning(true);
      
      if (dragOffset < 0) {
        // Dragged left - move forward
        setCurrentIndex((prev) => {
          const nextIndex = prev + cardsToMove;
          if (!isMobile && nextIndex >= properties.length - slidesToShow) {
            // Seamless loop
            setTimeout(() => {
              setIsTransitioning(false);
              setCurrentIndex(totalOriginal * 2);
              setTimeout(() => setIsTransitioning(true), 50);
            }, 400);
          }
          return nextIndex;
        });
      } else {
        // Dragged right - move backward
        setCurrentIndex((prev) => {
          const prevIndex = prev - cardsToMove;
          if (!isMobile && prevIndex < totalOriginal) {
            // Seamless loop
            setTimeout(() => {
              setIsTransitioning(false);
              setCurrentIndex(totalOriginal * 2);
              setTimeout(() => setIsTransitioning(true), 50);
            }, 400);
          }
          return prevIndex < 0 ? properties.length - 1 : prevIndex;
        });
      }
      
      setDragOffset(0);
      setTimeout(() => setIsTransitioning(false), 400);
    } else {
      // Snap back to current position
      setIsTransitioning(true);
      setDragOffset(0);
      setTimeout(() => setIsTransitioning(false), 400);
    }

    dragStartXRef.current = null;
    clickStartTime.current = null;
    dragThresholdReached.current = false;
    
    // Resume auto-slide after delay
    setTimeout(() => {
      if (!isDragging && isVisible) {
        startAutoSlide();
      }
    }, 3000);
  }, [isDragging, dragOffset, startAutoSlide, isVisible, isMobile, properties.length, slidesToShow, totalOriginal]);

  // Initialize active slides
  useEffect(() => {
    const initialSlides = [];
    for (let i = 0; i < slidesToShow; i++) {
      initialSlides.push((currentIndex + i) % totalOriginal);
    }
    setActiveSlides(initialSlides);
  }, [currentIndex, slidesToShow, totalOriginal]);

  // Check mobile view
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setCurrentIndex(mobile ? 0 : totalOriginal * 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [totalOriginal]);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startAutoSlide();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      try {
        observer.disconnect();
      } catch (e) {}
    };
  }, [startAutoSlide]);

  // Start auto-slide on mount
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  // Auto-slide pause/resume
  useEffect(() => {
    if (isDragging || isTransitioning) {
      stopAutoSlide();
    } else if (isVisible) {
      const timeout = setTimeout(() => {
        startAutoSlide();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, isDragging, isTransitioning, startAutoSlide, stopAutoSlide]);

  // Handle transition end
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

  // Navigation to slide
  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || isDragging) return;
      setIsTransitioning(true);
      setCurrentIndex(isMobile ? index : totalOriginal * 2 + index);
    },
    [isTransitioning, isDragging, isMobile, totalOriginal]
  );

  // Pause auto-slide on hover
  const handleMouseEnter = () => stopAutoSlide();
  const handleMouseLeave = () => {
    if (!isDragging) {
      startAutoSlide();
    }
  };

  // Navigation to property details
  const FilterPage = () => router.push("propertydetails");

  // Get current slide indicator
  const getCurrentSlideIndicator = () => {
    if (totalOriginal === 0) return 0;
    return ((currentIndex % totalOriginal) + totalOriginal) % totalOriginal;
  };

  // Calculate which cards should have staggered animation
  const getCardAnimationIndex = (index) => {
    if (index < slidesToShow) {
      return index;
    }
    return index % slidesToShow;
  };

  // PropertyCard component
  const PropertyCard = React.memo(function PropertyCard({ property, index }) {
    const handleCardClick = () => {
      // Check if this was a quick click (not a drag)
      const clickDuration = Date.now() - (clickStartTime.current || 0);
      const wasQuickClick = clickDuration < 200; // Less than 200ms
      const movedVeryLittle = Math.abs(dragOffset) < 10; // Moved less than 10px
      
      // Allow navigation if it was a quick click with minimal movement
      if (!dragThresholdReached.current && (wasQuickClick || movedVeryLittle)) {
        const queryParams = new URLSearchParams({
          id: property.id,
          title: property.title,
          location: property.location,
          image: property.image,
          price: property.price,
          period: property.period || "",
          beds: property.beds || 0,
          baths: property.baths || 0,
          reception: property.reception || 0,
          sqft: property.sqft || 0,
          badges: JSON.stringify(property.badges || []),
          energyRating: property.energyRating || "",
          fingerprint: property.fingerprint || "",
          status: property.status || "",
        });
        router.push(`/property?${queryParams.toString()}`);
      }
    };

    const animationIndex = getCardAnimationIndex(index);

    return (
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mx-2 cursor-pointer will-change-transform flex flex-col"
        onClick={handleCardClick}
        style={{
          minHeight: "400px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1) translateY(0)" : "scale(0.8) translateY(30px)",
          transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transitionDelay: `${400 + animationIndex * 200}ms`,
          pointerEvents: isDragging ? "none" : "auto",
        }}
      >
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover pointer-events-none select-none"
            loading="lazy"
            draggable="false"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop";
            }}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {property.badges?.map((badge, badgeIndex) => (
              <span
                key={`${property.id}-${badgeIndex}`}
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
  <Building className="w-3 h-3" /> {property.status}
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
            {property.beds > 0 && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1 text-blue-500" />
                <span>{property.beds} beds</span>
              </div>
            )}
            {property.baths > 0 && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1 text-blue-500" />
                <span>{property.baths} baths</span>
              </div>
            )}
            {property.reception > 0 && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-blue-500" />
                <span>{property.reception} rec</span>
              </div>
            )}
            {property.sqft > 0 && (
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
        className="w-full px-4 lg:px-12 py-12 border-y border-transparent dark:border-y-white relative"
        style={{ backgroundColor: "var(--background)" }}
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

        {/* Header */}
        <div
          className="flex flex-col lg:flex-row justify-between items-start mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(50px)",
            transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
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
            <p className="text-base lg:text-lg max-w-2xl mt-6">
              Discover our newest property listings, freshly added to the market with the most up-to-date features and pricing.
            </p>
          </div>
          <button
            onClick={FilterPage}
            className="mt-6 lg:mt-0 hover:text-cyan-500 font-semibold flex items-center transition-colors duration-200 text-sm lg:text-base"
            style={{ color: "var(--foreground)" }}
          >
            View all Latest
            <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-1" />
          </button>
        </div>

        {/* Carousel */}
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
            disabled={isTransitioning || isDragging}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ willChange: "transform" }}
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning || isDragging}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 lg:p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ willChange: "transform" }}
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
          </button>
          <div
            className="overflow-hidden rounded-xl cursor-grab active:cursor-grabbing"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            style={{ 
              touchAction: "pan-y pinch-zoom", 
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none"
            }}
          >
            <div
              ref={carouselRef}
              className="flex"
              style={{
                transform: `translate3d(calc(-${(currentIndex * 100) / slidesToShow}% + ${dragOffset}px), 0, 0)`,
                transition: isDragging || !isTransitioning ? "none" : "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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

          {/* Indicators */}
          <div
            className="flex justify-center mt-8 gap-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: "400ms",
            }}
          >
            {currentProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning || isDragging}
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