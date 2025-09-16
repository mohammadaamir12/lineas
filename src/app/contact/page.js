"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Mail, Phone, MapPin, User } from "lucide-react";

function ContactCard({ icon: Icon, title, subtitle, info, dark }) {
  return (
    <div
  className={`flex items-start p-6 rounded-2xl max-w-sm sm:max-w-2xs ${
    dark ? "bg-slate-800 text-white" : "bg-white text-gray-800"
  } shadow-lg hover:shadow-xl transition-shadow duration-300`}
>
      <div
        className={`p-3 rounded-xl flex items-center justify-center ${
          dark ? "bg-white/10" : "bg-slate-800"
        }`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="ml-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-md text-gray-500 mt-1">{subtitle}</p>
        <p
          className={`mt-3 font-bold text-lg ${
            dark ? "text-blue-200" : "text-slate-800"
          }`}
        >
          {info}
        </p>
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  placeholder,
  required = false,
  isTextarea = false,
}) {
  const baseClasses =
    "w-full p-5 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

  return (
    <div>
      <label className="block text-md font-bold text-slate-800 mb-2">
        {label} {required && <span className="text-slate-800">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          className={`${baseClasses} h-32 resize-none border-2`}
          required={required}
        />
      ) : (
        <div className="relative">
          <input
            type={type}
            placeholder={placeholder}
            className={`h-16 border-2 ${baseClasses} ${
              type === "email" || type === "tel" || type === "text"
                ? "pl-12"
                : ""
            } text-md`}
            required={required}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {type === "email" && <Mail className="w-5 h-5" />}
            {type === "tel" && <Phone className="w-5 h-5" />}
            {type === "text" && <User className="w-5 h-5" />}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative h-90 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: 'url("/image.png")' }}
        >
          <div className="absolute inset-0 bg-slate-700/80" />
          <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-white text-xl font-medium">
              Ready to find your perfect property? Our expert team is here to guide
              you every step of the way.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 -mt-30">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 justify-items-center">
              {/* Left Side - Contact Cards */}
              <div className="lg:col-span-2 space-y-6 z-10 relative mx-auto lg:mr-10 ">
                <ContactCard
                  icon={Mail}
                  title="Email Us"
                  subtitle="Quick response guaranteed"
                  info="info@lineas.co.uk"
                />
                <ContactCard
                  icon={Phone}
                  title="Call Us"
                  subtitle="Available for you"
                  info="+44207 265 9396"
                />
                <ContactCard
                  icon={MapPin}
                  title="Visit Our Office"
                  subtitle="Modern workspace"
                  info="8-10 Greatorex Street, London, E1 5NF"
                  dark
                />
              </div>

              {/* Right Side - Form */}
              <div className="lg:col-span-3 w-full">
                <div className="bg-white p-8 rounded-2xl shadow-lg z-10 relative w-full ">
                  <div className="mb-8 items-center text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Fill out the form below and we&apos;ll get back to you within 24 hours
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="First Name"
                        type="text"
                        placeholder="Enter your first name"
                        required
                      />
                      <InputField
                        label="Last Name"
                        type="text"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>

                    <InputField
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />

                    <InputField
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />

                    <div>
                      <label className="block text-md font-bold text-slate-800 mb-2">
                        Your Message <span className="text-slate-800">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          placeholder="Tell us about your property needs or any questions you have..."
                          className="text-md w-full p-5 pl-12 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
                          required
                        />
                        <div className="absolute left-4 top-4 text-gray-400">
                          <Mail className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert("Message sent! (This is a demo)")}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors duration-200 text-lg shadow-lg hover:shadow-xl"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}