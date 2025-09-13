'use client';

import { useState } from 'react';
import { ChevronDown, Grid3X3, List, Map, MapPin, Bed, Bath, Square, Star, TrendingUp } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const PropertyListingPage = () => {
  const [viewMode, setViewMode] = useState('grid');
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

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          All Sale Properties
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Browse our curated collection of premier listings.
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-teal-500" />
          <span className="text-gray-700">{properties.length} properties found</span>
          <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
            For Sale
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>
          
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
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
              className="w-full mt-2 px-4 py-2 text-gray-600 text-sm hover:text-gray-800 transition-colors"
            >
              All Categories
            </button>
          </div>

          {/* Price Interval Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Price Interval</h3>
            <div className="relative">
              <select
                value={filters.priceInterval}
                onChange={(e) => handleFilterChange('priceInterval', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priceIntervals.map((interval) => (
                  <option key={interval} value={interval}>{interval}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* City Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">City</h3>
            <div className="relative">
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Property Type Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Property Type</h3>
            <div className="relative">
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
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
            className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset All Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* View Mode Switcher */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Map className="w-4 h-4" />
              Map
            </button>
          </div>

          {/* Properties Grid/List */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border-2 border-yellow-200">
                  <div className="relative">
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
                    <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
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
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{property.location}</span>
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

                    <div className="flex items-center justify-between text-gray-600 mb-4 text-sm">
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
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(property.price)}<span className="text-sm font-normal text-gray-600">{property.priceType}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border-2 border-yellow-200">
                  <div className="flex">
                    <div className="relative w-80">
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
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{property.location}</span>
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
                      <div className="flex items-center gap-8 text-gray-600 mb-4">
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
                      <div className="text-3xl font-bold text-blue-600">
                        {formatPrice(property.price)}<span className="text-base font-normal text-gray-600">{property.priceType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'map' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div id="map" className="w-full h-[600px] relative bg-gray-100">
                <div className="absolute inset-0 bg-green-50">
                  {/* Simulated Map Background */}
                  <div className="w-full h-full relative overflow-hidden">
                    {/* Map grid lines to simulate map appearance */}
                    <svg className="absolute inset-0 w-full h-full opacity-20">
                      <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4ade80" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                    
                    {/* Property markers positioned to simulate actual locations */}
                    {properties.map((property, index) => (
                      <div
                        key={property.id}
                        className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
                        style={{
                          left: `${30 + index * 25}%`,
                          top: `${40 + index * 15}%`,
                        }}
                      >
                        {/* Red marker pin */}
                        <div className="relative">
                          <svg
                            width="32"
                            height="42"
                            viewBox="0 0 32 42"
                            className="drop-shadow-lg transition-transform group-hover:scale-110"
                          >
                            <path
                              d="M16 0C7.164 0 0 7.164 0 16c0 8.837 16 26 16 26s16-17.163 16-26C32 7.164 24.836 0 16 0z"
                              fill="#dc2626"
                            />
                            <circle cx="16" cy="16" r="8" fill="white" />
                            <circle cx="16" cy="16" r="4" fill="#dc2626" />
                          </svg>
                          
                          {/* Property info tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg p-3 min-w-[200px] z-10 border">
                            <div className="text-sm font-semibold text-gray-900 mb-1">
                              {property.title.length > 30 ? property.title.substring(0, 30) + '...' : property.title}
                            </div>
                            <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {property.location}
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              {formatPrice(property.price)}{property.priceType}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
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
                            {/* Tooltip arrow */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Simulated street names and landmarks */}
                    <div className="absolute top-20 left-20 bg-white px-2 py-1 rounded shadow text-xs text-gray-700">
                      Mayfair
                    </div>
                    <div className="absolute top-32 left-52 bg-white px-2 py-1 rounded shadow text-xs text-gray-700">
                      Kensington
                    </div>
                    <div className="absolute top-48 left-80 bg-white px-2 py-1 rounded shadow text-xs text-gray-700">
                      Shoreditch
                    </div>
                    
                    {/* Simulated roads */}
                    <div className="absolute top-24 left-0 w-full h-1 bg-gray-300 opacity-60"></div>
                    <div className="absolute top-0 left-40 w-1 h-full bg-gray-300 opacity-60"></div>
                    <div className="absolute top-36 left-0 w-full h-1 bg-gray-300 opacity-60"></div>
                  </div>
                </div>
                
                {/* Map controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="bg-white shadow-md rounded px-3 py-2 text-sm font-medium hover:bg-gray-50 border">
                    +
                  </button>
                  <button className="bg-white shadow-md rounded px-3 py-2 text-sm font-medium hover:bg-gray-50 border">
                    -
                  </button>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Legend</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                    <span>Property Location</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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

        .custom-marker {
          background: none !important;
          border: none !important;
        }
      `}</style>
      
      {/* Load Leaflet CSS */}
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
    </div>
    <Footer/>
    </>
  );
};

export default PropertyListingPage;