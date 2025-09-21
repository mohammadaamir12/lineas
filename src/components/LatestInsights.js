// components/LatestInsights.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight } from 'lucide-react';

const AppleSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="relative w-12 h-12">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-3 bg-gray-600 rounded-full"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-14px)`,
            animation: `fade 1s linear infinite`,
            animationDelay: `${-1.2 + i * 0.1}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fade {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  </div>
);

const LatestInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Fetch data from API
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const response = await fetch('https://test-demo.in/lineasapi/api/v1/viewwebsiteblog', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch insights');
        }

        const data = await response.json();
        
        if (data.STATUS_CODE === 'LS000' && data.STATUS === 'SUCCESS') {
          // Check if DATA exists and is an array
          if (data.DATA && Array.isArray(data.DATA) && data.DATA.length > 0) {
            // Format the data to match our component structure
            const formattedInsights = data.DATA.map(item => ({
              id: item.id,
              title: item.title,
              date: new Date(item.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }),
              image: item.image,
              excerpt: item.description,
              author: item.author
            }));
            
            setInsights(formattedInsights);
          } else {
            // API succeeded but returned empty data
            setInsights([]);
          }
        } else {
          throw new Error(data.MESSAGE || 'Failed to load insights');
        }
      } catch (err) {
        setError(err.message);
        setInsights([]); // Ensure insights is empty on error
        console.error('Error fetching insights:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

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

  return (
    <div
      ref={sectionRef}
      className="w-full px-4 lg:px-12 py-12"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Header with animation */}
      <div 
        className="flex flex-col lg:flex-row justify-between items-start mb-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>
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
              Insights
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

      {/* Loading State */}
      {loading && <AppleSpinner />}

      {/* Error State */}
      {error && !loading && (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-500 text-lg font-semibold mb-2">
              Error loading insights
            </p>
            <p className="text-gray-500 text-sm">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Cards Grid with individual card animations */}
      {!loading && !error && insights.length > 0 && (
        <div 
          className="grid gap-8 md:grid-cols-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.5)",
            transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "200ms",
          }}
        >
          {insights.map((post, index) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1) translateY(0)" : "scale(0.8) translateY(30px)",
                transition: "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: `${400 + (index * 200)}ms`,
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop';
                }}
              />
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                {post.author && (
                  <p className="text-xs text-gray-400 mt-2">
                    By {post.author}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Data Found State */}
      {!loading && !error && insights.length === 0 && (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-gray-600 text-xl font-semibold mb-2">
              No Data Found
            </p>
            <p className="text-gray-500 text-sm">
              There are no insights available at the moment. Please check back later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestInsights;