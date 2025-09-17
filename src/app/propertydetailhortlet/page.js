'use client';

import { useState } from 'react';
import { ChevronDown, Grid3X3, List, Map, MapPin, Bed, Bath, Square, Star, TrendingUp, Filter, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PropertyListingPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'Short Let',
    priceInterval: 'Any Interval',
    city: 'All Cities',
    propertyType: 'All Properties',
    maxPrice: 2000000
  });

  const properties = [
    {
      id: 1,
      title: "Luxury Short Let Apartment in Mayfair -Test",
      location: "London",
      price: 200,
      priceType: "/weekly",
      beds: 2,
      baths: 2,
      rec: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=300&fit=crop",
      featured: true,
      badges: ['Short Let']
    },
    {
      id: 2,
      title: "Charming Victorian Townhouse in Kensington",
      location: "Gulshan",
      price: 1200,
      priceType: "",
      beds: 3,
      baths: 2,
      rec: 1,
      sqft: 14000,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop",
      latest: true,
      badges: ['Short Let', 'Under Offer', '1 FP', 'EPC']
    },
    {
      id: 3,
      title: "Cozy Holiday Cottage in Cotswolds",
      location: "Chipping Campden",
      price: 150,
      priceType: "/daily",
      beds: 3,
      baths: 2,
      rec: 2,
      sqft: 900,
      image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=500&h=300&fit=crop",
      latest: true,
      badges: ['Short Let', 'Under Offer', 'Out of Stock']
    }
  ];

  const categories = ['Sale', 'Rent', 'Short Let', 'Commercial'];
  const priceIntervals = ['Any Interval', '£0-500', '£500-1000', '£1000-2000', '£2000+'];
  const cities = ['All Cities', 'London', 'Gulshan', 'Chipping Campden', 'Manchester', 'Birmingham'];
  const propertyTypes = ['All Properties', 'Apartment', 'House', 'Townhouse', 'Cottage'];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'Short Let',
      priceInterval: 'Any Interval',
      city: 'All Cities',
      propertyType: 'All Properties',
      maxPrice: 2000000
    });
  };

  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Featured': return 'bg-orange-500 text-white';
      case 'Short Let': return 'bg-orange-500 text-white';
      case 'Latest': return 'bg-blue-500 text-white';
      case 'Under Offer': return 'bg-red-500 text-white';
      case '1 FP': return 'bg-blue-100 text-blue-800';
      case 'EPC': return 'bg-green-100 text-green-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-500 text-white';
    }
  };

  const FilterContent = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        {isMobile && (
          <button
            onClick={() => setShowMobileFilters(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange('category', category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.category === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleFilterChange('category', 'All Categories')}
          className="w-full px-4 py-2 text-gray-600 text-sm hover:text-gray-800 transition-colors border border-gray-300 rounded-lg"
        >
          All Categories
        </button>
      </div>

      {/* City Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">City</h3>
        <div className="relative">
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Property Type Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Property Type</h3>
        <div className="relative">
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">
          Max Price: {formatPrice(filters.maxPrice)}
        </h3>
        <div className="relative">
          <input
            type="range"
            min={0}
            max={2000000}
            step={50000}
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>£0</span>
            <span>£2,000,000</span>
          </div>
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={resetFilters}
        className="w-full px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            All Rent Properties
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            Browse our curated collection of premier listings.
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
            <span className="text-sm sm:text-base text-gray-700">{properties.length} properties found</span>
            <span className="bg-teal-100 text-teal-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              Rent
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4 text-[#00D3F3]" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
              <span className="bg-slate-800 text-white px-2 py-1 rounded text-xs">Active</span>
            </button>
          </div>

          <div className="flex gap-6">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80">
              <div className="bg-white rounded-lg shadow-sm sticky top-4">
                <FilterContent />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* View Mode Switcher */}
              <div className="bg-white rounded-lg p-1 w-4/5 mx-auto mb-4 lg:w-auto lg:mx-0 lg:bg-transparent lg:p-0 lg:mb-6">
                <div className="flex gap-1 sm:gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 lg:flex-initial flex items-center justify-center lg:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 lg:flex-initial flex items-center justify-center lg:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'list'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`flex-1 lg:flex-initial flex items-center justify-center lg:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'map'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Map className="w-4 h-4" />
                    <span className="hidden sm:inline">Map</span>
                  </button>
                </div>
              </div>

              {/* Properties Grid */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {properties.map((property) => (
                    <div key={property.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border-2 border-yellow-200">
                      <div className="relative">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1">
                          {property.featured && (
                            <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              Featured
                            </div>
                          )}
                          {property.latest && (
                            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Latest
                            </div>
                          )}
                        </div>
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-wrap gap-1 justify-end">
                          {property.badges?.slice(0, 1).map((badge, index) => (
                            <div
                              key={index}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
                            >
                              {badge}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-600 mb-3">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm truncate">{property.location}</span>
                        </div>

                        {/* Additional badges */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {property.badges?.slice(1).map((badge, index) => (
                            <div
                              key={index}
                              className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor(badge)}`}
                            >
                              {badge}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between text-gray-600 mb-4 text-xs sm:text-sm gap-2">
                          <div className="flex items-center gap-1">
                            <Bed className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                            <span>{property.beds} beds</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                            <span>{property.baths} baths</span>
                          </div>
                          {property.rec && (
                            <div className="flex items-center gap-1">
                              <Square className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                              <span>{property.rec} rec</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Square className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                            <span>{property.sqft} sqft</span>
                          </div>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-blue-600">
                          {formatPrice(property.price)}
                          <span className="text-xs sm:text-sm font-normal text-gray-600">{property.priceType}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Properties List View */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border-2 border-yellow-200">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-80">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                            {property.featured && (
                              <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                Featured
                              </div>
                            )}
                            {property.latest && (
                              <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Latest
                              </div>
                            )}
                          </div>
                          <div className="absolute top-3 right-3">
                            {property.badges?.slice(0, 1).map((badge, index) => (
                              <div
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
                              >
                                {badge}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1 p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-1 text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="text-sm sm:text-base">{property.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {property.badges?.slice(1).map((badge, index) => (
                              <div
                                key={index}
                                className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor(badge)}`}
                              >
                                {badge}
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-gray-600 mb-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4 text-blue-500" />
                              <span>{property.beds} beds</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="w-4 h-4 text-blue-500" />
                              <span>{property.baths} baths</span>
                            </div>
                            {property.rec && (
                              <div className="flex items-center gap-1">
                                <Square className="w-4 h-4 text-blue-500" />
                                <span>{property.rec} rec</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Square className="w-4 h-4 text-gray-400" />
                              <span>{property.sqft} sqft</span>
                            </div>
                          </div>
                          <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                            {formatPrice(property.price)}
                            <span className="text-sm sm:text-base font-normal text-gray-600">{property.priceType}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Map View */}
              {viewMode === 'map' && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="w-full h-[400px] sm:h-[600px] relative bg-gray-100">
                    <div className="absolute inset-0 bg-green-50">
                      <svg className="absolute inset-0 w-full h-full opacity-20">
                        <defs>
                          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4ade80" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                      
                      {properties.map((property, index) => (
                        <div
                          key={property.id}
                          className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
                          style={{
                            left: `${30 + index * 25}%`,
                            top: `${40 + index * 15}%`,
                          }}
                        >
                          <div className="relative">
                            <svg
                              width="24"
                              height="32"
                              viewBox="0 0 32 42"
                              className="sm:w-8 sm:h-10 drop-shadow-lg transition-transform group-hover:scale-110"
                            >
                              <path
                                d="M16 0C7.164 0 0 7.164 0 16c0 8.837 16 26 16 26s16-17.163 16-26C32 7.164 24.836 0 16 0z"
                                fill="#dc2626"
                              />
                              <circle cx="16" cy="16" r="8" fill="white" />
                              <circle cx="16" cy="16" r="4" fill="#dc2626" />
                            </svg>
                            
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg p-3 min-w-[180px] sm:min-w-[200px] z-10 border">
                              <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                                {property.title.length > 30 ? property.title.substring(0, 30) + '...' : property.title}
                              </div>
                              <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {property.location}
                              </div>
                              <div className="text-sm sm:text-lg font-bold text-blue-600">
                                {formatPrice(property.price)}{property.priceType}
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-600 mt-2">
                                <span className="flex items-center gap-1">
                                  <Bed className="w-3 h-3" />
                                  {property.beds}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Bath className="w-3 h-3" />
                                  {property.baths}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Square className="w-3 h-3" />
                                  {property.sqft}
                                </span>
                              </div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
                      <button className="bg-white shadow-md rounded px-2 py-1 sm:px-3 sm:py-2 text-sm font-medium hover:bg-gray-50 border">
                        +
                      </button>
                      <button className="bg-white shadow-md rounded px-2 py-1 sm:px-3 sm:py-2 text-sm font-medium hover:bg-gray-50 border">
                        -
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed inset-y-0 left-0 right-0 bg-white shadow-xl overflow-y-auto">
            <FilterContent isMobile={true} />
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .grid-cols-2 > * {
            min-width: 0;
          }
        }
      `}</style>
    </div>
    <Footer/>
    </>
  );
};

export default PropertyListingPage;