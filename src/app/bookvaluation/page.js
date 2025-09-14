'use client';
import React, { useState, useRef, useEffect } from 'react';

// Mock toast function - replace with your actual react-hot-toast
const toast = {
  success: (message) => console.log('SUCCESS:', message),
  error: (message) => console.log('ERROR:', message),
};

export default function PropertyValuationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    valuationType: '',
    address: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    lookingFor: '',
  });
  const [detailsData, setDetailsData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    notes: '',
    marketingConsent: false,
    termsAccepted: false,
  });

  const secondFormRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDetailsChange = (field, value) => {
    setDetailsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (isFormValid()) {
      setCurrentStep(2);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    if (isDetailsFormValid()) {
      console.log('Complete Form Data:', { ...formData, ...detailsData });
      toast.success('Form submitted successfully!');
    } else {
      toast.error('Please fill in all required fields and accept terms');
    }
  };

  const isFormValid = () => {
    return (
      formData.valuationType.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.propertyType.trim() !== '' &&
      formData.bedrooms.trim() !== '' &&
      formData.bathrooms.trim() !== '' &&
      formData.lookingFor.trim() !== ''
    );
  };

  const isDetailsFormValid = () => {
    return (
      detailsData.title.trim() !== '' &&
      detailsData.firstName.trim() !== '' &&
      detailsData.lastName.trim() !== '' &&
      detailsData.email.trim() !== '' &&
      detailsData.termsAccepted
    );
  };

  useEffect(() => {
    if (currentStep === 2 && secondFormRef.current) {
      secondFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      secondFormRef.current.querySelector('select')?.focus();
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Get Your Property Valuation
      </h1>
      <div className="relative w-full max-w-4xl px-4 flex justify-center">
        <div className="w-full flex justify-center">
          {/* Step 1 - Property Details */}
          <div
            className={`w-full max-w-md transition-all duration-500 ease-in-out ${
              currentStep === 1 ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Valuation Type Section */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  What valuation would you like?
                </h2>
                <div className="space-y-3">
                  {['Sell a property', 'Let a property', 'Both'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="valuationType"
                        value={option}
                        checked={formData.valuationType === option}
                        onChange={(e) =>
                          handleInputChange('valuationType', e.target.value)
                        }
                        className="w-5 h-5 text-gray-900 border-gray-400 rounded-full focus:ring-gray-900"
                        disabled={currentStep === 2}
                      />
                      <span className="ml-3 text-gray-900 font-medium">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Address Section */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  Your Address
                  <span className="ml-2 text-yellow-500">✏️</span>
                </h2>
                <input
                  type="text"
                  placeholder="Enter your property address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                  disabled={currentStep === 2}
                />
              </div>

              {/* Property Type Section */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Property Type:
                </h2>
                <div className="space-y-3">
                  {['Flat', 'House', 'Other'].map((type) => (
                    <label
                      key={type}
                      className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        value={type}
                        checked={formData.propertyType === type}
                        onChange={(e) =>
                          handleInputChange('propertyType', e.target.value)
                        }
                        className="w-5 h-5 text-gray-900 border-gray-400 rounded-full focus:ring-gray-900"
                        disabled={currentStep === 2}
                      />
                      <span className="ml-3 text-gray-900 font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedrooms and Bathrooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <input
                    type="number"
                    placeholder="No. Bedrooms:"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                    disabled={currentStep === 2}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="No. Bathrooms"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                    disabled={currentStep === 2}
                  />
                </div>
              </div>

              {/* Looking For Section */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Are you also looking to:
                </h2>
                <div className="space-y-3">
                  {['Buy', 'Rent', 'Neither'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="lookingFor"
                        value={option}
                        checked={formData.lookingFor === option}
                        onChange={(e) =>
                          handleInputChange('lookingFor', e.target.value)
                        }
                        className="w-5 h-5 text-gray-900 border-gray-400 rounded-full focus:ring-gray-900"
                        disabled={currentStep === 2}
                      />
                      <span className="ml-3 text-gray-900 font-medium">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              {currentStep === 1 && (
                <button
                  onClick={handleNext}
                  disabled={!isFormValid()}
                  className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center ${
                    isFormValid()
                      ? 'bg-gray-900 hover:bg-gray-800 text-white cursor-pointer'
                      : 'bg-gray-400 text-white cursor-not-allowed opacity-60'
                  }`}
                >
                  Next
                  <span className="ml-2">›</span>
                </button>
              )}
            </div>
          </div>

          {/* Step 2 - Personal Details */}
          <div
            ref={secondFormRef}
            className={`w-full max-w-md transition-transform duration-500 ease-in-out ${
              currentStep === 2
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0 hidden md:block'
            }`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
              {/* Title Dropdown */}
              <div className="mb-6">
                <select
                  value={detailsData.title}
                  onChange={(e) => handleDetailsChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                >
                  <option value="">Title:</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>

              {/* First Name */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="First Name:"
                  value={detailsData.firstName}
                  onChange={(e) => handleDetailsChange('firstName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                />
              </div>

              {/* Last Name */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Last Name:"
                  value={detailsData.lastName}
                  onChange={(e) => handleDetailsChange('lastName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Email:"
                  value={detailsData.email}
                  onChange={(e) => handleDetailsChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <input
                  type="tel"
                  placeholder="Phone:"
                  value={detailsData.phone}
                  onChange={(e) => handleDetailsChange('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                />
              </div>

              {/* Mobile */}
              <div className="mb-6">
                <input
                  type="tel"
                  placeholder="Mobile:"
                  value={detailsData.mobile}
                  onChange={(e) => handleDetailsChange('mobile', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                />
              </div>

              {/* Notes */}
              <div className="mb-6">
                <textarea
                  placeholder="Notes:"
                  value={detailsData.notes}
                  onChange={(e) => handleDetailsChange('notes', e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none resize-none"
                />
              </div>

              {/* Marketing Consent */}
              <div className="mb-6">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={detailsData.marketingConsent}
                    onChange={(e) =>
                      handleDetailsChange('marketingConsent', e.target.checked)
                    }
                    className="w-5 h-5 text-gray-900 border-gray-400 rounded-sm focus:ring-gray-900 mt-0.5 flex-shrink-0"
                  />
                  <span className="ml-3 text-gray-700">
                    Keep me up-to-date with property related marketing.
                  </span>
                </label>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={detailsData.termsAccepted}
                    onChange={(e) =>
                      handleDetailsChange('termsAccepted', e.target.checked)
                    }
                    className="w-5 h-5 text-gray-900 border-gray-400 rounded-sm focus:ring-gray-900 mt-0.5 flex-shrink-0"
                  />
                  <span className="ml-3 text-gray-700">
                    I have read and agree to the Terms and Conditions, Privacy
                    Policy and Cookies Policy.
                  </span>
                </label>
              </div>

              {/* Back and Submit Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 font-medium py-3 px-6 rounded-lg border-2 border-gray-900 text-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
                >
                  ‹ Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isDetailsFormValid()}
                  className={`flex-1 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center ${
                    isDetailsFormValid()
                      ? 'bg-gray-900 hover:bg-gray-800 text-white cursor-pointer'
                      : 'bg-gray-400 text-white cursor-not-allowed opacity-60'
                  }`}
                >
                  Confirm Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}