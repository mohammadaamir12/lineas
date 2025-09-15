'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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

  // Reset all data to initial state
  const resetAllData = () => {
    setFormData({
      valuationType: '',
      address: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      lookingFor: '',
    });
    setDetailsData({
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
    setCurrentStep(1);
  };

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
      
      // Clear everything and return to initial state
      setTimeout(() => {
        resetAllData();
      }, 1000); // Small delay to let user see the success message
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
      setTimeout(() => {
        secondFormRef.current.querySelector('select')?.focus();
      }, 300);
    }
  }, [currentStep]);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <Toaster position="top-right" reverseOrder={false} />
      <div className="px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          Get Your Property Valuation
        </h1>

        {/* Mobile: Stack forms vertically, Desktop: Side by side */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start lg:gap-8">
            
            {/* Step 1 - Property Details */}
            <div className="w-full lg:max-w-md mb-6 lg:mb-0">
              <div className="bg-white rounded-lg shadow-sm border-2 sm:border-3 border-black p-4 sm:p-6 flex flex-col">
                {/* Content wrapper with flex-grow to push button to bottom */}
                <div className="flex-grow">
                  {/* Valuation Type Section */}
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                      What valuation would you like?
                    </h2>
                    <div className="space-y-2 sm:space-y-3">
                      {['Sell a property', 'Let a property', 'Both'].map((option) => (
                        <label
                          key={option}
                          className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            name="valuationType"
                            value={option}
                            checked={formData.valuationType === option}
                            onChange={(e) =>
                              handleInputChange('valuationType', e.target.value)
                            }
                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 border-gray-400 rounded-full focus:ring-gray-900"
                            disabled={currentStep === 2}
                          />
                          <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-900 font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-2 flex items-center">
                      Your Address
                      <span className="ml-2 text-yellow-500">✏️</span>
                    </h2>
                    <input
                      type="text"
                      placeholder="Enter your property address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm sm:text-base"
                      disabled={currentStep === 2}
                    />
                  </div>

                  {/* Property Type Section */}
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Property Type:</h2>
                    <div className="space-y-2 sm:space-y-3">
                      {['Flat', 'House', 'Other'].map((type) => (
                        <label
                          key={type}
                          className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            name="propertyType"
                            value={type}
                            checked={formData.propertyType === type}
                            onChange={(e) => handleInputChange('propertyType', e.target.value)}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 border-gray-400 rounded-full focus:ring-gray-900"
                            disabled={currentStep === 2}
                          />
                          <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-900 font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Bedrooms and Bathrooms */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div>
                      <input
                        type="number"
                        placeholder="No. Bedrooms:"
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm sm:text-base"
                        disabled={currentStep === 2}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="No. Bathrooms"
                        value={formData.bathrooms}
                        onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm sm:text-base"
                        disabled={currentStep === 2}
                      />
                    </div>
                  </div>

                  {/* Looking For Section */}
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                      Are you also looking to:
                    </h2>
                    <div className="space-y-2 sm:space-y-3">
                      {['Buy', 'Rent', 'Neither'].map((option) => (
                        <label
                          key={option}
                          className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            name="lookingFor"
                            value={option}
                            checked={formData.lookingFor === option}
                            onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 border-gray-400 rounded-full focus:ring-gray-900"
                            disabled={currentStep === 2}
                          />
                          <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-900 font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Next Button - Fixed at bottom */}
                {currentStep === 1 && (
                  <button
                    onClick={handleNext}
                    disabled={!isFormValid()}
                    className={`w-full font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 flex items-center justify-center mt-auto text-sm sm:text-base ${
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
              className={`w-full lg:max-w-md transition-all duration-500 ease-in-out ${
                currentStep === 2 ? 'opacity-100 scale-100 block' : 'hidden lg:hidden'
              }`}
            >
              <div className="bg-white rounded-lg shadow-sm border-2 sm:border-3 border-black p-4 sm:p-6 flex flex-col">
                {/* Content wrapper with flex-grow */} 
                <div className="flex-grow">
                  {/* Title Dropdown */}
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                      Your Details
                    </h2>
                    <select
                      value={detailsData.title}
                      onChange={(e) => handleDetailsChange('title', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm sm:text-base"
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
                  <div className="mb-4 sm:mb-6">
                    <input
                      type="text"
                      placeholder="First Name:"
                      value={detailsData.firstName}
                      onChange={(e) => handleDetailsChange('firstName', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="mb-4 sm:mb-6">
                    <input
                      type="text"
                      placeholder="Last Name:"
                      value={detailsData.lastName}
                      onChange={(e) => handleDetailsChange('lastName', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4 sm:mb-6">
                    <input
                      type="email"
                      placeholder="Email:"
                      value={detailsData.email}
                      onChange={(e) => handleDetailsChange('email', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-4 sm:mb-6">
                    <input
                      type="tel"
                      placeholder="Phone:"
                      value={detailsData.phone}
                      onChange={(e) => handleDetailsChange('phone', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="mb-4 sm:mb-6">
                    <input
                      type="tel"
                      placeholder="Mobile:"
                      value={detailsData.mobile}
                      onChange={(e) => handleDetailsChange('mobile', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Notes */}
                  <div className="mb-4 sm:mb-6">
                    <textarea
                      placeholder="Notes:"
                      value={detailsData.notes}
                      onChange={(e) => handleDetailsChange('notes', e.target.value)}
                      rows={3}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none resize-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Marketing Consent */}
                  <div className="mb-4 sm:mb-6">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={detailsData.marketingConsent}
                        onChange={(e) =>
                          handleDetailsChange('marketingConsent', e.target.checked)
                        }
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 border-gray-400 rounded-sm focus:ring-gray-900 mt-0.5 flex-shrink-0"
                      />
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">
                        Keep me up-to-date with property related marketing.
                      </span>
                    </label>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-4 sm:mb-6">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={detailsData.termsAccepted}
                        onChange={(e) =>
                          handleDetailsChange('termsAccepted', e.target.checked)
                        }
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 border-gray-400 rounded-sm focus:ring-gray-900 mt-0.5 flex-shrink-0"
                      />
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">
                        I have read and agree to the Terms and Conditions, Privacy Policy
                        and Cookies Policy.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Back and Submit Buttons - Fixed at bottom */}
                <div className="flex gap-3 sm:gap-4 mt-auto">
                  <button
                    onClick={handleBack}
                    className="flex-1 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 flex items-center justify-center border-2 border-gray-900 text-gray-900 hover:bg-gray-50 text-sm sm:text-base"
                  >
                    <span className="mr-2">‹</span>
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isDetailsFormValid()}
                    className={`flex-1 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 flex items-center justify-center text-sm sm:text-base ${
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
    </div>
    <Footer/>
    </>
  );
}