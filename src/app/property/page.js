'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

function PropertyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const propertyId = searchParams.get('id');
  
  // Mock data - in a real app, you'd fetch this based on the ID
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
    }
  };

  const property = propertyData[propertyId];
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </button>

        {/* Property details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Property ID: {propertyId}
              </h1>
              <p className="text-xl text-gray-600">
                This is the property details page 🚀
              </p>
            </div>

            {property ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {property.title}
                </h2>
                <p className="text-gray-600">📍 {property.location}</p>
                <div className="flex gap-6 text-sm text-gray-500">
                  <span>🛏️ {property.beds} beds</span>
                  <span>🚿 {property.baths} baths</span>
                  <span>📐 {property.sqft} sqft</span>
                </div>
                <p className="text-3xl font-bold text-cyan-700">
                  {property.price}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Property details not found.</p>
            )}
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