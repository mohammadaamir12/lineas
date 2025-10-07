'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState,useEffect,useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { ChevronLeft, ChevronRight,Square, Car,Home, Bed, Bath, MapPin,Globe } from 'lucide-react';
import { Heart, Users, Printer, Share2 } from 'lucide-react';
import { Facebook, Twitter, Linkedin,Whatsapp , Mail } from 'lucide-react';
import Footer from '@/components/Footer';



function PropertyContent() {
  const [isMobile, setIsMobile] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const dataString = searchParams.get("data");
  const property = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

const images = property?.gallery_images?.map((img, index) => ({
    id: index + 1,
    src: img.gallery_image,
    alt: `Property image ${index + 1}`
  })) || [];
   {console.log('imagess444',property.gallery_images);
   }

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




  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-scroll


const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef(null);

 

  // Navigate to next image
  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  // Navigate to previous image
  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  // Select specific image
  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const [liked, setLiked] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  // Print-specific contact info
  const contactInfo = {
    email: 'info@realestate.com',
    phone: '+44 20 1234 5678',
    website:'www.lineas.com',
    address:'heloo addresss'
  };
const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(encodeURIComponent(window.location.href));
  }, []);
  const details = encodeURIComponent(
    `${property.title}\nLocation: ${property.location}\nPrice: ${property.price}/month\nDetails: ${property.beds}, ${property.baths},${property.reception}, ${property.sqft}\nDescription: ${property.description}`
  );

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, "_blank", "width=600,height=400");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${details}&url=${pageUrl}`, "_blank", "width=600,height=400");
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`, "_blank", "width=600,height=400");
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${details}%20${pageUrl}`, "_blank");
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=Property Details&body=${details}%0A${pageUrl}`;
  };

  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering for the iframe
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isUnderOffer = property.status.toLowerCase().includes('under');
  const statusColor = isUnderOffer 
    ? 'bg-gradient-to-r from-red-500 to-red-600' 
    : 'bg-gradient-to-r from-green-500 to-green-600';

  return (
    <div className='bg-[#F3F4F6]'>
    {/* Print-only header with contact info */}
    <div className="hidden print:block bg-white p-6 border-b-2 border-gray-300">
  <div className="max-w-7xl mx-auto flex flex-col">
    {/* Logo at top */}
    <div className="mb-8 -ml-3">
      <img src="/logo3.png" alt="Logo" className="h-20 w-auto" />
    </div>

    {/* Contact Info stacked vertically */}
    <div className="flex flex-col gap-4 text-gray-700 ">
      {/* Email */}
      <div className="flex  gap-2">
        <Mail className="w-5 h-5 text-cyan-500" />
        <span>{contactInfo.email}</span>
      </div>

      {/* Phone */}
      <div className="flex gap-2">
        <svg
          className="w-5 h-5 text-cyan-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span>{contactInfo.phone}</span>
      </div>

      {/* Website */}
      <div className="flex  gap-2">
         <Globe className="w-5 h-5 text-cyan-500" />
        <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline">
          {contactInfo.website}
        </a>
      </div>

      {/* Address */}
      <div className="flex  gap-2 text-center">
        <svg
          className="w-5 h-5 text-cyan-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 22s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
          />
        </svg>
        <span>{contactInfo.address}</span>
      </div>
    </div>
  </div>
</div>

    
    <div className="print:hidden">
      <Header/>
    </div>
      
      
      <div className="max-w-7xl mx-auto rounded-md p-6 md:p-8 print-content">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Image Gallery */}
          <div className="lg:col-span-2">
       {/* Main carousel container */}
    
      <div className="bg-white rounded-md shadow-2xl overflow-hidden">
  {/* Main image display */}
  <div className="relative bg-gray-800 flex justify-center items-center p-4">
    {/* Image counter badge */}
    <div className="absolute top-6 right-6 bg-gray-800/80 text-white px-3 py-1.5 rounded-full text-sm font-medium z-10 print:hidden">
      {currentImageIndex + 1} / {property.gallery_images?.length}
    </div>

    {/* Main image */}
    <div className="relative w-full max-w-[100%]" style={{ paddingBottom: "56.25%" }}>
      <img
        src={property.gallery_images?.[currentImageIndex]}
        alt={`Gallery image ${currentImageIndex + 1}`}
        className="absolute inset-0 w-full h-full object-cover rounded-md"
        draggable={false}
      />
    </div>
  </div>

  {/* Thumbnail strip */}
  <div className="relative bg-slate-800 p-4 ">
    <button
  onClick={prevImage}
  className="hidden print:hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
  aria-label="Previous image"
>
  <ChevronLeft size={24} />
</button>

<button
  onClick={nextImage}
  className="hidden print:hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
  aria-label="Next image"
>
  <ChevronRight size={24} />
</button>

    <div
      ref={scrollContainerRef}
      className="flex gap-2 sm:gap-3 px-1 overflow-x-auto [&::-webkit-scrollbar]:hidden py-1"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {property.gallery_images?.map((image, index) => (
        <button
          key={index}
          onClick={() => selectImage(index)}
          className={`flex-shrink-0 rounded-lg transition-all duration-200 ${
            index === currentImageIndex
              ? "ring-2 ring-sky-400 shadow-lg"
              : "ring-1 ring-gray-200 hover:ring-gray-400"
          }`}
          aria-label={`View image ${index + 1}`}
        >
          <div className="w-20 h-16 sm:w-28 sm:h-20 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </button>
      ))}
    </div>
  </div>
</div>
{console.log('property',property)
}

      
      <div className="bg-white mt-6 rounded-md shadow-sm p-8">
        {/* Header Section */}
     <div className="flex flex-col md:flex-row justify-between items-start mb-6">
  {/* Left Section */}
  <div className="flex-1">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">
      {property.title}
    </h1>
    <div className="flex items-center gap-3 mb-4">
      <span className="text-gray-600 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-gray-400" /> {property.location}
      </span>
    </div>
    <div className="flex items-center gap-3 mb-4">
      <span className={` ${property?.badges[0] === "Latest"
                    ? "bg-orange-500 text-white"
                    : property?.badges[0] === "Commercial"
                    ? "bg-purple-500 text-white"
                    : property?.badges[0] === "For Sale"
                    ? "bg-blue-500 text-white":
                    property?.badges[0] === "Short Let"
                    ? "bg-orange-500 text-white"
                    : "bg-blue-500 text-white"} text-white px-4 py-1.5 rounded-md font-medium text-sm`}>
        {property?.badges[0]}
      </span>
      <span className="bg-orange-500 text-white px-4 py-1.5 rounded-md font-bold text-sm">
        {property?.badges[1]}
      </span>
    </div>

    {/* Mobile Price + Fav + Print */}
    <div className="flex flex-col gap-4 md:hidden mt-4">
      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-cyan-500">{property.price}</span>
        <span className="text-lg text-gray-500">/monthly</span>
      </div>

      {/* Fav + Print (Stacked) */}
      <div className="flex flex-col items-start gap-3">
        {/* Fav Icon */}
        <button 
          onClick={() => setLiked(!liked)}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
        >
          <Heart 
            className={`w-4 h-4 md:w-5 md:h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>

        {/* Print Button */}
        <button 
          onClick={handlePrint}
          className="bg-gray-800 text-white w-full md:w-auto h-10 md:h-auto px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors text-sm md:text-base"
        >
          <Printer className="w-4 h-4 md:w-5 md:h-5" /> Print Details
        </button>
      </div>
    </div>
  </div>

  {/* Right Section (Desktop only) */}
  <div className="hidden md:flex flex-col items-end gap-4">
    <button 
      onClick={() => setLiked(!liked)}
      className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
    >
      <Heart 
        className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-slate-800'} hover:text-red-500 `} 
      />
    </button>
    <div className="text-right">
      <span className="text-4xl font-bold text-cyan-500">{property.price}</span>
      <span className="text-xl text-gray-500 ml-1">/monthly</span>
    </div>
   <button 
  onClick={handlePrint}
  className="bg-gray-800 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 
             border border-transparent 
             hover:bg-white hover:text-slate-800 hover:border-slate-800"
>
   Print Details <Printer className="w-5 h-5" />
</button>
  </div>
</div>
        <hr className="my-6 border-gray-200" />

        {/* Property Details */}
        <div className="flex gap-8 text-gray-700 mb-8">
          <span className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-cyan-500" /> <span className="font-medium">{property.beds}</span>
          </span>
          <span className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-cyan-500" /> <span className="font-medium">{property.baths}</span>
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-500" /> <span className="font-medium">{property.reception}</span>
          </span>
          <span className="flex items-center gap-2">
            <Square className="w-5 h-5 text-cyan-500" /> <span className="font-medium">{property.sqft}</span>
          </span>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {property.description}
          </p>
        </div>

            <hr className="my-6 border-gray-200" />

        <div className="w-full bg-white">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between py-2">
        <div className="flex items-center space-x-3">
          <Home className="w-6 h-6 text-cyan-500" />
          <span className="text-lg font-bold text-gray-800">Property Status</span>
         
        </div>
         
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-cyan-400 font-bold px-5 py-2 rounded-lg shadow-lg">
          ID: {property.id}
        </div>
        
      </div>
      <span className={`px-12 py-2 text-white text-sm font-semibold rounded-md shadow-md ${statusColor} hidden md:inline-block`}>
  {property.status}
</span>

      {/* Mobile View */}
      <div className="md:hidden p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-cyan-500" />
            <span className="text-md font-bold text-gray-800">Property Status</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className={`inline-flex items-center justify-center px-5 py-2 text-white font-semibold rounded-md shadow-md text-sm ${statusColor}`}>
            {property.status}
          </span>
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-cyan-400 font-bold px-4 py-2.5 rounded-lg shadow-lg text-xs break-all">
            ID: {property.id}
          </div>
        </div>
      </div>
    </div>


        <hr className="my-6 border-gray-200" />

       {/* Floor Plans */}
              {property?.floor_plans?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                      <path d="M3 9h18M9 21V9" strokeWidth="2"/>
                    </svg>
                    Floor Plans ({property.floor_plans.length})
                  </h2>
                  <div className={`flex ${property.floor_plans.length > 1 ? 'flex-row gap-4 overflow-x-auto' : 'flex-col'}`}>
                    {property.floor_plans.map((floor, index) => (
                      floor.floor_plan_image && (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 max-w-md flex-shrink-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{floor.floor_name}</h3>
                          <p className="text-gray-500 mb-4">{floor.square_footage} sq ft</p>
                          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
                            <img
                              src={floor.floor_plan_image}
                              alt={`${floor.floor_name} floor plan`}
                              className="w-full h-full object-contain cursor-pointer"
                              onClick={() => setIsOpen(true)}
                            />
                            <button
                              className="absolute top-3 right-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center print:hidden"
                              onClick={() => setIsOpen(true)}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              <hr className="my-6 border-gray-200" />

              {/* EPC Certificate */}
              {property?.floor_plans?.some(floor => floor.epc_certificate) && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    EPC Certificate
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-sm">
                    <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center relative">
                      <img
                        src={property.floor_plans.find(floor => floor.epc_certificate)?.epc_certificate}
                        alt="EPC Certificate"
                        className="w-40 h-40 object-contain cursor-pointer"
                        onClick={() => setIsOpen(true)}
                      />
                      <button
                        className="absolute top-3 right-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center print:hidden"
                        onClick={() => setIsOpen(true)}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal */}
              {isOpen && (
                <div
                  className="fixed inset-0 bg-gray-500/40 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className="bg-white p-4 rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={property.floor_plans.find(floor => floor.epc_certificate)?.epc_certificate || property.floor_plans[0]?.floor_plan_image || images[currentImageIndex]?.src}
                      alt="Enlarged view"
                      className="w-80 h-80 object-contain"
                    />
                  </div>
                </div>
              )}

       {property?.floor_plans?.some(floor => floor.epc_certificate) &&(<hr className="my-6 border-gray-200 print:hidden" />)} 

        {/* Share Section */}
        <div className="print:hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
            Share this property
          </h2>
         <div className="flex gap-3 flex-wrap">
  <button onClick={shareFacebook} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors">
    <Facebook className="w-5 h-5" /> Facebook
  </button>
  <button onClick={shareTwitter} className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors">
    <Twitter className="w-5 h-5" /> Twitter
  </button>
  <button onClick={shareLinkedIn} className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors">
    <Linkedin className="w-5 h-5" /> LinkedIn
  </button>
  <button onClick={shareWhatsApp} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors"> <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/> </svg> WhatsApp </button>
  <button onClick={shareEmail} className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-colors">
    <Mail className="w-5 h-5" /> Email
  </button>
</div>

        </div>
      </div>
 


<section className="max-w-5xl mx-auto px-4 py-4 shadow-md mt-6 rounded-md bg-white border border-gray-200">
  <h2 className="text-2xl font-semibold mb-4">Location</h2>

  <div className="map-container relative w-full h-[400px] sm:h-[500px] rounded-lg overflow-hidden shadow-md mb-8">
    {isClient && (
      <iframe
        src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&hl=en&z=14&output=embed`}
        className="w-full h-full border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map showing property location"
      ></iframe>
    )}

   <div
  id="property-popup"
  className="print:hidden absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-full bg-white rounded-xl shadow-2xl w-80 max-w-[90%] z-20 h-48" 
>
  <button
    onClick={(e) => {
      e.currentTarget.parentElement.style.display = 'none';
    }}
    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    aria-label="Close property details"
  >
    ✕
  </button>

  <div className="border border-yellow-500 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-md m-6 p-2"> 
    <div className="flex items-start gap-2"> 
      <img
        src={property?.image}
        alt="Luxury Short Let Apartment in Mayfair"
        className="w-12 h-12 rounded-md object-cover" 
      />
      <div>
        <span className="inline-block text-xs font-bold uppercase bg-yellow-500 text-white px-1 py-0.5 rounded mb-1">
          Featured
        </span>
        <h3 className="text-sm font-semibold leading-tight">{property.title}</h3> 
        <p className="text-xs text-gray-700 flex items-center gap-1">
          📍 {property.location}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3 text-xs text-gray-700 mt-1"> 
      <span>🛏 {property.beds}</span>
      <span>🛁 {property.baths}</span>
      <span>📐 {property.sqft}</span>
    </div>

    <p className="text-base font-bold text-yellow-700 mt-1">{property.price}/monthly</p> 
  </div>

  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
</div>
  </div>
</section>
           
          </div>

          {/* Right Side: Enhanced Contact Form */}
       <div className="h-fit top-2 sticky w-full max-w-5xl mx-auto print:hidden">
  <div className="bg-white rounded-md shadow-sm border border-gray-200 p-5">
    <h1 className="text-2xl font-bold text-gray-900 mb-2 mt-1">
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
            className="w-full px-4 py-4 bg-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-900"
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
            className="w-full px-4 py-4 bg-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-900"
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
            className="w-full px-4 py-4 bg-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-900"
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
            className="w-full px-4 py-4 bg-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-900"
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
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
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
      <hr className="my-8 border-gray-300" />
      <div className="print:hidden">
        <Footer/>
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

