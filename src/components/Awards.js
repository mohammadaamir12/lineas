"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Awards() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlides, setActiveSlides] = useState([0, 1, 2]); // Track visible slides
  const sectionRef = useRef(null);

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

  // Track active slides for animation
  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    const slidesPerView = swiper.params.slidesPerView;
    
    if (typeof slidesPerView === 'number') {
      const newActiveSlides = [];
      for (let i = 0; i < slidesPerView; i++) {
        newActiveSlides.push((currentIndex + i) % 5);
      }
      setActiveSlides(newActiveSlides);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div
        ref={sectionRef}
        className="w-full px-4 lg:px-12 py-12 border-y border-transparent dark:border-y-white"
        style={{
          backgroundColor: "var(--background)",
        }}
      >
        {/* Header with animation */}
        <div 
          style={{ 
            fontFamily: 'Arial, sans-serif', 
            color: '#2c3e50',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(50px)",
            transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: '38px', fontWeight:'550', display: 'flex', alignItems: 'baseline' }}>
            <span style={{ color: '#000',marginRight:10 }}>Awards &</span>
            <span style={{ color: '#0FC6D6', alignItems:'center'}}>
                Achievements
              <hr style={{ border: '2px solid #D3F1F8', width: '100%', marginTop: '1px',borderRadius:10 }} />
            </span>
          </h1>
          <p
            className="text-base lg:text-lg max-w-2xl mt-6"
            style={{ color: "var(--foreground)" }}
          >
            Our achievements and awards showcase the recognition we have received
            for consistently delivering value, excellence, and outstanding
            contributions in our field.
          </p>
        </div>

        {/* Swiper Carousel with animation */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.5)",
            transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "200ms",
          }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              el: ".awards-pagination",
              clickable: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
            onSlideChange={handleSlideChange}
          >
            {[1, 2, 3, 4, 5].map((i, index) => (
              <SwiperSlide key={i}>
                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-start justify-center hover:shadow-lg transition"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1) translateY(0)" : "scale(0.8) translateY(30px)",
                    transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transitionDelay: `${400 + (index * 200)}ms`,
                  }}
                >
                  <Image
                    src="/awards.png"
                    alt="Award"
                    width={350}
                    height={350}
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pagination with animation */}
        <div 
          className="awards-pagination mt-6 flex justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "400ms",
          }}
        ></div>
      </div>
    </section>
  );
}