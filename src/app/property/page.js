'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState,useEffect,useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { ChevronLeft, ChevronRight,Square, Car,Home, Bed, Bath, MapPin } from 'lucide-react';


import Footer from '@/components/Footer';

function PropertyContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id');
  const scrollContainerRef = useRef(null); 
  const [activeImage, setActiveImage] = useState(0);

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
    }
  ];

 
    const scrollRef = useRef(null);

   const scrollToImage = (index) => {
    if (scrollContainerRef.current) {
      const imageWidth = 128 + 12; // w-32 (128px) + gap (12px)
      const scrollLeft = index * imageWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

 
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // adjust based on card width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };


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
<div className="relative bg-white rounded-xl p-2 sm:p-4 shadow-md">
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
              ? 'ring-2 sm:ring-4 ring-blue-500 shadow-lg'
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
      Property ID : 11245
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
      <span className="text-base sm:text-lg font-bold">₹400 for Sale</span>
      {/* Left-pointing Arrow */}
      <div className="absolute -left-4 top-0 h-full w-0 border-y-[24px] sm:border-y-[calc(50%)] border-y-transparent border-r-[16px] border-r-sky-400"></div>
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

          <section className="max-w-5xl mx-auto px-4 py-10 shadow-md mt-6 rounded bg-white">
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

    <section className="max-w-5xl mx-auto  mt-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6">Floor Plans</h2>

        {/* Header Row */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">First Floor</h3>
          <span className="text-gray-500">Sqft :</span>
        </div>

        {/* Floor Plan Image */}
        <div className="w-full overflow-hidden rounded-md border border-gray-200">
          <img
            src="/Floorplan.jpg"
            alt="Floor plan"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>

    <div className="w-full  mx-auto px-4 py-8 shadow-md rounded mt-6 bg-white">
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

   <div className="w-full max-w-7xl mx-auto mt-6 px-4 py-8 bg-white shadow-md rounded">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Similar Homes You May Like
      </h2>

      {/* Navigation and Cards Container */}
      <div className="relative">
        {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
        <button className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
          <ChevronLeft onClick={() => scroll("left")} className="w-6 h-6 text-gray-600" />
        </button>
        <button onClick={() => scroll("right")} className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Mobile Navigation Arrows - Positioned outside the scroll area */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button  className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
            <ChevronLeft onClick={() => scroll("left")} className="w-6 h-6 text-gray-600" />
          </button>
          <button  onClick={() => scroll("right")} className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Property Cards */}
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className="flex space-x-4 md:grid md:grid-cols-2 md:gap-6 md:mx-12 md:space-x-0">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-80 md:w-auto">
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
                      <span className="font-semibold">{property.price} {property.type}</span>
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