'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState,useEffect,useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { ChevronLeft, ChevronRight,Square, Car,Home, Bed, Bath, MapPin } from 'lucide-react';


import Footer from '@/components/Footer';

function PropertyContent() {
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef(null); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Extract property data from URL parameters
  const getPropertyFromParams = () => {
    const id = searchParams.get('id');
    const title = searchParams.get('title') || "Property Details";
    const location = searchParams.get('location') || "";
    const image = searchParams.get('image') || "/newbuild.jpg";
    const price = searchParams.get('price') || "";
    const period = searchParams.get('period') || "";
    const beds = parseInt(searchParams.get('beds')) || 0;
    const baths = parseInt(searchParams.get('baths')) || 0;
    const reception = parseInt(searchParams.get('reception')) || 0;
    const sqft = parseInt(searchParams.get('sqft')) || 0;
    const status = searchParams.get('status') || "";
    const energyRating = searchParams.get('energyRating') || "";
    const fingerprint = searchParams.get('fingerprint') || "";
    
    // Parse badges from JSON string
    let badges = [];
    try {
      const badgesParam = searchParams.get('badges');
      if (badgesParam) {
        badges = JSON.parse(badgesParam);
      }
    } catch (error) {
      console.error('Error parsing badges:', error);
    }

    return {
      id,
      title,
      location,
      image,
      price,
      period,
      beds,
      baths,
      reception,
      sqft,
      badges,
      status,
      energyRating,
      fingerprint
    };
  };

  const property = getPropertyFromParams();
   

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

  const [selectedFloor, setSelectedFloor] = useState("first");

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

  const scrollToImage = (index) => {
  if (scrollContainerRef.current) {
    const container = scrollContainerRef.current;
    const selectedThumbnail = container.children[index] 
    if (selectedThumbnail) {
      container.scrollTo({
        left: selectedThumbnail.offsetLeft - container.clientWidth / 2 + selectedThumbnail.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }
};
const selectImage = (index) => {
    setCurrentImageIndex(index);
    
    // Scroll the selected thumbnail into view
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const thumbnails = container.children;
      
      if (thumbnails[index]) {
        const thumbnail = thumbnails[index];
        const containerRect = container.getBoundingClientRect();
        const thumbnailRect = thumbnail.getBoundingClientRect();
        
        // Calculate if thumbnail is outside visible area
        const isOutsideLeft = thumbnailRect.left < containerRect.left;
        const isOutsideRight = thumbnailRect.right > containerRect.right;
        
        if (isOutsideLeft || isOutsideRight) {
          thumbnail.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    }
  };



  const features = [
    {
      icon: Home,
      label: 'SQFT',
      value: property.sqft
    },
    {
      icon: Bed,
      label: 'BEDROOMS',
      value: property.beds
    },
    {
      icon: Bath,
      label: 'BATHROOMS',
      value: property.baths
    },
    {
      icon: MapPin,
      label: 'RECEPTION',
      value: property.reception
    }
  ];

  const properties = [
    {
      id: 1,
      featured: true,
      image: "/newbuild.jpg", 
      title: "Bedroom, Earls Court, SW5",
      description: "A newly refurbished two double bedroom garden f",
      bedrooms: 2,
      bathrooms: 2,
      sqft: "Sqft Sq.ft",
      parking: 1,
      price: "£1,875000",
      type: "For sale"
    },
    {
      id: 2,
      featured: true,
      image: "/newbuild.jpg", 
      title: "3 Bedroom flat, Agnes Street, E14",
      description: "A well presented apartment which consists of thr",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "Sqft Sq.ft",
      parking: 1,
      price: "£475,000",
      type: "For sale"
    },
    {
      id: 3,
      featured: true,
      image: "/newbuild.jpg", 
      title: "3 Bedroom flat, Agnes Street, E14",
      description: "A well presented apartment which consists of thr",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "Sqft Sq.ft",
      parking: 1,
      price: "£475,000",
      type: "For sale"
    },
    {
      id: 4,
      featured: true,
      image: "/newbuild.jpg", 
      title: "3 Bedroom flat, Agnes Street, E14",
      description: "A well presented apartment which consists of thr",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "Sqft Sq.ft",
      parking: 1,
      price: "£475,000",
      type: "For sale"
    }
  ];



  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (!properties?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const visibleCards = isMobile ? 1 : 2;
        const nextIndex = (prevIndex + visibleCards) % properties.length;

        if (scrollContainerRef.current) {
          const cardWidth = isMobile ? 320 : 320; // both same width, but scroll step differs
          scrollContainerRef.current.scrollTo({
            left: nextIndex * cardWidth,
            behavior: "smooth",
          });
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, properties.length]);

  return (
    <div>
    <Header/>
      <div className="relative h-[300px] w-full">
        {/* Background image */}
        <img
          src={property.image}
          alt="Property"
          className="absolute inset-0 object-cover w-full h-full z-0"
        />

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-10" /> */}

        {/* Content */}
        <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-col justify-center px-6 sm:px-12">
          <div className="bg-[#0C0330] rounded-md text-white text-2xl sm:text-3xl font-semibold py-4 px-6 max-w-fit">
            {property.title}
          </div>
          <div className="bg-[#32B8DF] rounded-md text-white text-sm py-2 px-6 mt-1 max-w-fit tracking-wide">
            HOME /
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto rounded-md p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Image Gallery */}
          <div className="lg:col-span-2">
       {/* Main carousel container */}
<div className="relative bg-white rounded-xl p-2 sm:p-4 shadow-md border border-gray-200">
  {/* Current image display */}
  <div className="mt-2 flex justify-center">
    <div className="w-full sm:w-180 h-60 sm:h-100 rounded-xl overflow-hidden shadow-lg">
      <img
        src={images1[currentImageIndex].src}
        alt={images1[currentImageIndex].alt}
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Thumbnail strip */}
  <div className="relative mt-3 sm:mt-4">
    {/* Navigation arrows - only show on medium+ screens */}
    <button
      onClick={prevImage}
      className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-lg"
    >
      <ChevronLeft size={20} />
    </button>
    
    <button
      onClick={nextImage}
      className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-lg"
    >
      <ChevronRight size={20} />
    </button>

    {/* Scrollable image container */}
    <div 
      ref={scrollContainerRef}
      className="flex gap-2 sm:gap-3 p-2 sm:px-16 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
    >
      {images1.map((image, index) => (
        <button
          key={image.id}
          onClick={() => selectImage(index)}
          className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${
            index === currentImageIndex
              ? 'ring-1 sm:ring-2 ring-slate-800 shadow-lg'
              : 'hover:ring-1 sm:hover:ring-2 hover:ring-gray-300'
          }`}
        >
          <div className="w-20 h-16 sm:w-32 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-50">
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


        
     

       <div className="mt-8 mb-4 flex flex-col sm:flex-row items-stretch bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg overflow-hidden shadow-md">
  {/* Property ID Section */}
  <div className="flex-1 px-3 py-2 flex items-center justify-center sm:justify-start">
    <span className="text-lg sm:text-xl font-bold text-gray-700">
      Property ID : {property.id}
    </span>
  </div>
  
  {/* Sale & Price Section */}
  <div className="flex items-stretch w-full sm:w-auto">
    {/* SALE Tag with Left Arrow */}
    <div className="relative bg-gray-800 text-white px-6 sm:px-8 flex items-center">
      <span className="text-base sm:text-lg font-bold">SALE</span>
      {/* Left-pointing Arrow using border-trick responsive */}
      <div className="absolute -left-4 top-0 h-full w-0 border-y-[24px] sm:border-y-[calc(50%)] border-y-transparent border-r-[16px] border-r-gray-800"></div>
    </div>
    
    {/* Price Section */}
    <div className="relative bg-sky-400 text-white px-6 sm:px-8 flex items-center">
      <span className="text-base sm:text-lg font-bold">{property.price} for Sale</span>
      {/* Left-pointing Arrow */}
      <div className="absolute -left-4 top-0 h-full w-0 border-y-[24px] sm:border-y-[calc(50%)] border-y-transparent border-r-[16px] border-r-sky-400"></div>
    </div>
  </div>
</div>


            {/* Features */}
            <div className="mt-6 bg-white shadow-md p-4 rounded border border-gray-200">
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

          <section className="max-w-5xl mx-auto px-4 py-10 shadow-md mt-6 rounded bg-white border border-gray-200">
      {/* Location */}
      <h2 className="text-2xl font-semibold mb-4">Location</h2>
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md mb-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39739.29765782021!2d-0.056183199999999994!3d51.51116855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876034c48f3b41f%3A0x5e1dcbadb2ddc76!2s1%20Agnes%20St%2C%20London%20E14%207DG%2C%20UK!5e0!3m2!1sen!2sin!4v1693923456789!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Address */}
      <p className="text-gray-600 mb-10">
        <strong>1 Agnes Street, London E14 7DG, UK</strong>
      </p>

      {/* Description */}
      <h2 className="text-2xl font-semibold mb-4">Description</h2>
      <p className="text-gray-700 leading-relaxed">
        A well presented apartment which consists of three double bedrooms with the
        master bedroom benefiting with the ensuite. This property which has been a 2 bed
        converted into a three bedroom boasts three good size bedrooms one benefitting
        from and en-suite, separate bathroom/WC, an open plan kitchen / reception and a
        good sized storage cupboard for any household utilities. This property provides
        easy access to the shops, gyms, restaurants, bars and all the other amenities the
        area has to offer and is only 0.8 mile walk to Mile End station.
      </p>
    </section>

   <section className="max-w-5xl mx-auto mt-6">
  <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
    {/* Title */}
    <h2 className="text-2xl font-semibold mb-6">Floor Plans</h2>

    {/* Floor Selection and Header Row */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-medium">Floor Plan</h3>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md border ${selectedFloor === "first" ? "bg-slate-700 text-white " : "bg-white text-gray-900 border-gray-300"} focus:outline-none   transition-colors duration-200`}
            onClick={() => setSelectedFloor("first")}
          >
            First Floor
          </button>
          <button
            className={`px-4 py-2 rounded-md border ${selectedFloor === "second" ? "bg-slate-700 text-white " : "bg-white text-gray-900 border-gray-300"} focus:outline-none   transition-colors duration-200`}
            onClick={() => setSelectedFloor("second")}
          >
            Second Floor
          </button>
        </div>
      </div>
      <span className="text-gray-500">
        Sqft: {selectedFloor === "first" ? "1200" : "1000"}
      </span>
    </div>

    {/* Floor Plan Image */}
    <div className="w-full overflow-hidden rounded-md border border-gray-200">
      <img
        src="/Floorplan.jpg"
        alt={`${selectedFloor === "first" ? "First" : "Second"} Floor plan`}
        className="w-full h-auto object-contain"
      />
    </div>
  </div>
</section>

    <div className="w-full  mx-auto px-4 py-8 shadow-md rounded mt-6 bg-white border border-gray-200">
      <div className="bg-white">
        {/* Form Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Arrange a Viewing
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-medium text-gray-700 mb-3">
              First Name, Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors text-medium"
              placeholder=""
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-medium text-gray-700 mb-3">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors text-medium"
              placeholder=""
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-medium text-gray-700 mb-3">
              Your Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors text-medium"
              placeholder=""
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-medium text-gray-700 mb-3">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors text-medium resize-none"
              placeholder=""
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-md text-medium font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Request Info
            </button>
          </div>
        </form>
      </div>
    </div>

 <div className="w-full max-w-7xl mx-auto mt-6 px-4 py-8 bg-white shadow-md rounded border border-gray-200">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Similar Homes You May Like
      </h2>

      {/* Cards Wrapper */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className={`flex space-x-4`}
            style={{ scrollSnapType: "x mandatory" }}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-80 scroll-snap-align-start"
              >
                {/* Property Image */}
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  {property.featured && (
                    <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {property.description}{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                      Know More
                    </span>
                  </p>

                  {/* Property Features */}
                  <div className="flex items-center justify-between mb-6 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm">{property.bedrooms} Br</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath className="w-4 h-4" />
                      <span className="text-sm">{property.bathrooms} Ba</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Square className="w-4 h-4" />
                      <span className="text-sm">{property.sqft}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Car className="w-4 h-4" />
                      <span className="text-sm">{property.parking}</span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-900 text-white px-6 py-3 rounded-md flex items-center justify-center flex-1 mr-2">
                      <span className="font-semibold">
                        {property.price} {property.type}
                      </span>
                    </div>
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
                      Save For Later
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {properties.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-gray-900" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  
           
          </div>

          {/* Right Side: Enhanced Contact Form */}
       <div className="h-fit sticky top-22 w-full max-w-5xl mx-auto">
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <h1 className="text-2xl font-bold text-gray-900 mb-2">
      Arrange a Viewing
    </h1>
    
    {/* Info Box */}
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-2">
      <p className="text-blue-600 text-md mb-2">
        <strong>Want to save time?</strong>
      </p>
      <p className="text-blue-600 text-sm">
        <span className="underline cursor-pointer hover:text-blue-800">Sign in</span> or <span className="underline cursor-pointer hover:text-blue-800">register</span> to auto-fill this form with your details.
      </p>
    </div>

    <div className="space-y-3">
      {/* Name Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-3 bg-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-900"
            placeholder="First Name*"
          />
        </div>
        
        <div>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-3 bg-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-900"
            placeholder="Last Name*"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
            className="w-full px-3 py-3 bg-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-900"
          placeholder="Your Email*"
        />
      </div>

      {/* Phone Field */}
      <div>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
            className="w-full px-3 py-3 bg-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-900"
          placeholder="Your Phone Number*"
        />
      </div>

      {/* Message Field */}
      <div>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-900 resize-none"
          placeholder="Your Message"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{transform: 'rotate(50deg)'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        Send Request
      </button>
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