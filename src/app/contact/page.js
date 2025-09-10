"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Mail, Phone, MapPin } from "lucide-react";

function ContactCard({ icon: Icon, title, subtitle, info, dark }) {
  return (
    <div
      className={`flex items-start p-6 rounded-2xl shadow-lg`}
      style={{
        background: dark ? "#1E3A8A" : "var(--background)", 
        color: dark ? "#fff" : "var(--foreground)",
      }}
    >
      <div
        className="p-3 rounded-xl flex items-center justify-center"
        style={{
          background: dark ? "rgba(255,255,255,0.1)" : "#1E3A8A",
        }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="ml-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-80">{subtitle}</p>
        <p
          className="mt-2 font-medium"
          style={{ color: dark ? "#bfdbfe" : "#1E3A8A" }}
        >
          {info}
        </p>
      </div>
    </div>
  );
}


export default function ContactPage() {
  return (
    <div>
      <Header />

      <section className="w-full">
        {/* Hero Section */}
        <div
          className="relative h-80 flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/image.png")',
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Get in Touch
            </h1>
            <p className="text-white mt-3">
              Ready to find your perfect property? Our expert team is here to
              guide you every step of the way.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div
          className="py-16 px-4 sm:px-6 lg:px-8 shadow-lg"
          style={{ background: "var(--background)", color: "var(--foreground)", }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="space-y-6">
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
            <div
              className="md:col-span-2 p-8 rounded-2xl shadow-md"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
            >
              <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
              <p className="mb-6 opacity-80">
                Fill out the form below and we'll get back to you within 24 hours
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label>First Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full p-3 border rounded-lg"
                      style={{
                        background: "var(--background)",
                        color: "var(--foreground)",
                        borderColor: "rgba(0,0,0,0.2)",
                      }}
                    />
                  </div>
                  <div>
                    <label>Last Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full p-3 border rounded-lg"
                      style={{
                        background: "var(--background)",
                        color: "var(--foreground)",
                        borderColor: "rgba(0,0,0,0.2)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full p-3 border rounded-lg"
                    style={{
                      background: "var(--background)",
                      color: "var(--foreground)",
                      borderColor: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>

                <div>
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full p-3 border rounded-lg"
                    style={{
                      background: "var(--background)",
                      color: "var(--foreground)",
                      borderColor: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>

                <div>
                  <label>Your Message *</label>
                  <textarea
                    placeholder="Tell us about your property needs..."
                    className="w-full p-3 border rounded-lg h-28"
                    style={{
                      background: "var(--background)",
                      color: "var(--foreground)",
                      borderColor: "rgba(0,0,0,0.2)",
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full p-3 rounded-lg flex items-center justify-center gap-2 font-medium"
                  style={{
                    background: "#1E3A8A",
                    color: "#fff",
                  }}
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

