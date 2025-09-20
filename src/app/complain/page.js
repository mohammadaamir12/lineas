"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ComplainSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://test-demo.in/lineasapi/api/v1/getlandlordsdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": "VzJIQk5FVHVxZWtvUGlTNnRjbkgxNGk4ZjRYby9RWTlJeTh2Z3lkNHNoT2wyUG1oekIwQ2hTaW5pckw0b2VEZGJOcytBZnJ2aFNpQmJJNUJzVzFkVlE9PQ=="
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.DATA || result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <section className="w-full">
          <div className="relative h-80 flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/footer-bg.png")',
            }}
          >
            <div className="absolute inset-0 bg-gray-600/60" />
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                Loading...
              </h1>
            </div>
          </div>
          <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-16 flex justify-center items-center">
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
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <section className="w-full">
          <div className="relative h-80 flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/footer-bg.png")',
            }}
          >
            <div className="absolute inset-0 bg-gray-600/60" />
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                Error: {error}
              </h1>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <Header />
      <section className="w-full">
        <div
          className="relative h-80 flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/footer-bg.png")',
          }}
        >
          <div className="absolute inset-0 bg-gray-600/60" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              {data.heading}
            </h1>
          </div>
        </div>
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="bg-white rounded-lg shadow-lg p-16">
                <div 
                  className="text-gray-700 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}