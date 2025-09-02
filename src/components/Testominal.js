// components/Testimonials.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed",
    role: "Web Developer, Lineas",
    text: `Don't just rely on internet searches to find a property. It's well worth going into a branch and speaking face to face with the agent so they get an idea of what you are looking for. We did this with Adrian and he understood clearly our requirements and set up some viewings quickly and efficiently and we soon had a great flat under offer. The purchase in now complete and I would highly recommend Adrian and his team. We sold our house with Winkworth too!`,
    image: "/awards.png",
  },
  {
    name: "Rahat",
    role: "Sr. Full Stack Developer, Lapasar",
    text: `Don't just rely on internet searches to find a property. It's well worth going into a branch and speaking face to face with the agent so they get an idea of what you are looking for. We did this with Adrian and he understood clearly our requirements and set up some viewings quickly and efficiently and we soon had a great flat under offer.`,
    image: "/awards.png",
  },
  {
    name: "Ali",
    role: "Product Designer, XYZ",
    text: `The team was extremely professional and understood my vision perfectly. The process was seamless and I’m very satisfied with the results.`,
    image: "/awards.png",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0E172B] text-white py-16 px-6 lg:px-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left Side */}
        <div>
          <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-6">
            <Quote className="text-2xl text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-snug">
            What do <br /> our clients say?
          </h2>
          <p className="text-gray-300 mb-6">
            From trust to satisfaction, hear directly from our valued clients as
            they share their stories and feedback about working with us.
          </p>
          <button className="bg-cyan-500 text-white px-6 py-3 rounded-full font-medium hover:bg-cyan-600 transition">
            Connect now <span className="ml-1">•</span>
          </button>
        </div>

{/* Right Side - Slider */}
<div className="relative">
  {/* Visible area */}
  <div className="overflow-hidden rounded-lg">
    {/* Slider wrapper */}
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${current * 100}%)` }}
    >
      {testimonials.map((t, idx) => (
        <div
          key={idx}
          className="min-w-full bg-white text-gray-800 p-8 shadow-md"
        >
          <Quote className="text-cyan-500 text-2xl mb-4" />
          <p className="mb-6 leading-relaxed">{t.text}</p>
          <div className="flex items-center gap-4">
            <Image
              src={t.image}
              alt={t.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Arrows (now visible) */}
  <button
    onClick={prevSlide}
    className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
  >
    <ChevronLeft className="text-gray-600" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
  >
    <ChevronRight className="text-gray-600" />
  </button>

  {/* Dots */}
  <div className="flex justify-center mt-4 gap-2">
    {testimonials.map((_, idx) => (
      <button
        key={idx}
        onClick={() => setCurrent(idx)}
        className={`h-2 w-2 rounded-full transition ${
          idx === current ? "bg-cyan-500" : "bg-gray-400"
        }`}
      ></button>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}
