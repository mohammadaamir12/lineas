'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState,useEffect,scrollContainerRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Home, Bed, Bath, MapPin } from 'lucide-react';
import Footer from '@/components/Footer';

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

  const images1 = [
    {
      id: 1,
      src: '/newbuild.jpg',
      alt: 'Property exterior view',
      type: 'exterior'
    },
    {
      id: 2,
      src: '/newbuild.jpg',
      alt: 'Living room',
      type: 'interior'
    },
    {
      id: 3,
      src: '/newbuild.jpg',
      alt: 'Modern kitchen',
      type: 'kitchen'
    },
    {
      id: 4,
      src: '/newbuild.jpg',
      alt: 'Bedroom',
      type: 'bedroom'
    },
    {
      id: 5,
      src: '/newbuild.jpg',
      alt: 'Bathroom',
      type: 'bathroom'
    },
    {
      id: 6,
      src: '/newbuild.jpg',
      alt: 'Office space',
      type: 'office'
    },
    {
      id: 7,
      src: '/newbuild.jpg',
      alt: 'Additional room',
      type: 'room'
    },
    {
      id: 8,
      src: '/newbuild.jpg',
      alt: 'Another view',
      type: 'interior'
    }
  ];

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollToImage = (index) => {
    if (scrollContainerRef.current) {
      const imageWidth = 128 + 12; // w-32 (128px) + gap (12px)
      const scrollLeft = index * imageWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images1.length;
    setCurrentImageIndex(nextIndex);
    scrollToImage(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? images1.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    scrollToImage(prevIndex);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(autoScrollInterval);
  }, [currentImageIndex]);


  const features = [
    {
      icon: Home,
      label: 'SQFT',
      value: '710'
    },
    {
      icon: Bed,
      label: 'BEDROOMS',
      value: '3'
    },
    {
      icon: Bath,
      label: 'BATHROOMS',
      value: '2'
    },
    {
      icon: MapPin,
      label: 'RECEPTION',
      value: '1'
    }
  ];

  return (
    <div>
    <Header/>
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
           {/* Main carousel container */}
      <div className="relative bg-white rounded-xl p-4 shadow-md">
        {/* Current image display */}
        <div className="mt-2 flex justify-center">
          <div className="w-180 h-100 rounded-xl overflow-hidden shadow-lg">
            <img
              src={images1[currentImageIndex].src}
              alt={images1[currentImageIndex].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Thumbnail strip */}
        <div className="relative">
          {/* Navigation arrows - positioned outside the scroll container */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable image container with padding for arrows */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-3 p-4 px-16 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            style={{ scrollbarWidth: 'thin' }}
          >
            {images1.map((image, index) => (
              <button
                key={image.id}
                onClick={() => selectImage(index)}
                className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${
                  index === currentImageIndex
                    ? 'ring-4 ring-blue-500 shadow-lg'
                    : 'hover:ring-2 hover:ring-gray-300'
                }`}
              >
                <div className="w-32 h-24 bg-gradient-to-br from-gray-100 to-gray-50">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
        </div>

        
     

        <div className="mt-8 mb-4 flex items-center bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg overflow-hidden shadow-md">
      {/* Property ID Section */}
      <div className="flex-1 px-3 py-2">
        <span className="text-xl font-bold text-gray-700">
          Property ID : 11245
        </span>
      </div>
      
      {/* Sale Section */}
      <div className="flex items-center h-12">
        {/* SALE Tag with Left Arrow */}
        <div className="relative bg-gray-800 text-white px-8 h-full flex items-center">
          <span className="text-lg font-bold">SALE</span>
          {/* Left-pointing Arrow using CSS border trick */}
          <div className="absolute -left-4 top-0 w-0 h-0 border-r-[16px] border-r-gray-800 border-t-[24px] border-t-transparent border-b-[24px] border-b-transparent"></div>
        </div>
        
        {/* Price Section */}
        <div className="relative bg-sky-400 text-white px-8 h-full flex items-center">
          <span className="text-lg font-bold">400 for Sale</span>
          {/* Left-pointing Arrow for price section */}
          <div className="absolute -left-4 top-0 w-0 h-0 border-r-[16px] border-r-sky-400 border-t-[24px] border-t-transparent border-b-[24px] border-b-transparent"></div>
        </div>
      </div>
    </div>

            {/* Features */}
            <div className="mt-6 bg-white shadow-md p-4 rounded">
  <h2 className="text-2xl  font-bold text-gray-900 mb-4">Facts and Features</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
    {features.map((feature, index) => {
      const IconComponent = feature.icon;
      return (
        <div key={index} className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-gray-700" />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {feature.label}
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {feature.value}
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>

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
          <div className="h-fit sticky top-20">
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
      <Footer/>
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