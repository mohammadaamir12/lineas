'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Image from 'next/image';

function PropertyContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    yourEmail: '',
    theirEmail: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Mock data
  const propertyData = {
    1: {
      title: "Luxury 3-Bedroom Apartment with River Views",
      location: "London",
      price: "£1,450,000",
      beds: 3,
      baths: 2,
      sqft: 1450,
    },
    2: {
      title: "Luxury Short Let Apartment in Mayfair -Test (Copy)",
      location: "London",
      price: "£20,040",
      beds: 2,
      baths: 2,
      sqft: 1200,
    },
    3: {
      title: "Luxury 3-Bedroom Apartment with River Views",
      location: "London",
      price: "£1,450,000",
      beds: 3,
      baths: 2,
      sqft: 1450,
    },
  };

  const property = propertyData[propertyId] || {
    title: "3 Bedroom flat, Agnes Street, E14",
    location: "",
    price: "",
    beds: 3,
    baths: 0,
    sqft: 0,
  };

  const images = [
    '/awards.png',
    '/awards.png',
    '/newbuild.jpg',
    '/awards.png',
    '/awards.png',
  ]

  const [activeIndex, setActiveIndex] = useState(0);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all required fields
    if (formData.name && formData.yourEmail && formData.theirEmail && formData.message) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      // Here you would typically make an API call
      // Example: await sendEmail(formData);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          yourEmail: '',
          theirEmail: '',
          message: ''
        });
      }, 3000);
    }
  };

  return (
    <div>
      <div className="relative h-[300px] w-full">
        {/* Background image */}
        <img
          src="/newbuild.jpg"
          alt="Property"
          className="absolute inset-0 object-cover w-full h-full z-0"
        />

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-10" /> */}

        {/* Content */}
        <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-col justify-center px-6 sm:px-12">
          <div className="bg-[#0C0330] text-white text-2xl sm:text-3xl font-semibold py-4 px-6 max-w-fit">
            3 Bedroom flat, Agnes Street, E14
          </div>
          <div className="bg-[#32B8DF] text-white text-sm py-2 px-6 mt-1 max-w-fit tracking-wide">
            HOME /
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto rounded-md p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Image Gallery */}
          <div className="lg:col-span-2">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-md border">
              <img
                src={images[activeIndex]}
                alt={`Image ${activeIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center mt-4 space-x-2 overflow-x-auto scrollbar-hide">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-16 rounded-md object-cover cursor-pointer border-2 ${
                    index === activeIndex
                      ? 'border-blue-500'
                      : 'border-gray-300'
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            {/* Property Info */}
            <div className="mt-4 text-sm text-gray-700">
              <p><strong>Property ID:</strong> LEA0021</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded">SALE</span>
                <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded">£475 For sale</span>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Facts and Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-800">
                <div><strong>Bedrooms:</strong> 2</div>
                <div><strong>Bathrooms:</strong> 1</div>
                <div><strong>Reception:</strong> 1</div>
                <div><strong>Furnished:</strong> Yes</div>
                <div><strong>Available:</strong> Immediately</div>
              </div>
            </div>
          </div>

          {/* Right Side: Enhanced Contact Form */}
          <div className="h-fit sticky top-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Form Header */}
              <div className="bg-gray-100 p-4 rounded-t-lg">
                <h3 className="text-lg font-medium text-gray-700">
                  Share With a Friend
                </h3>
              </div>

              {/* Form Body */}
              <div className="p-6">
                {/* Success Message */}
                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4 text-sm">
                    ✓ Message sent successfully!
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
                      First Name, Last Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#32B8DF] focus:border-transparent transition-all text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Your Email Field */}
                  <div>
                    <label htmlFor="yourEmail" className="block text-sm text-gray-600 mb-1">
                      Your Email
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      id="yourEmail"
                      name="yourEmail"
                      required
                      value={formData.yourEmail}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#32B8DF] focus:border-transparent transition-all text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Their Email Field */}
                  <div>
                    <label htmlFor="theirEmail" className="block text-sm text-gray-600 mb-1">
                      Their Email
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      id="theirEmail"
                      name="theirEmail"
                      required
                      value={formData.theirEmail}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#32B8DF] focus:border-transparent transition-all text-sm"
                      placeholder="friend.email@example.com"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-600 mb-1">
                      Message
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#32B8DF] focus:border-transparent transition-all resize-none text-sm"
                      placeholder="Write your message here..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#32B8DF] hover:bg-[#2AA5C9] text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#32B8DF] focus:ring-offset-2"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyContent />
    </Suspense>
  );
}