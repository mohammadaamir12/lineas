// components/FAQ.jsx
"use client";

import { useState } from "react";
import { Plus, Minus, Mail } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "When do I need to start looking for a property?",
    answer:
      "You should start looking about 2 to 4 weeks before you need to move. If you start looking too early, you are likely to see a property that is available before you are.",
  },
  {
    question: "How much rent should I be looking to pay?",
    answer:
      "It depends on your budget and requirements. Generally, consider allocating around 30% of your income towards rent.",
  },
  {
    question: "What sort of Agreement will I have?",
    answer:
      "Most rental agreements are Assured Shorthold Tenancies (ASTs) in the UK. Terms may vary based on landlord and property.",
  },
  {
    question:
      "I have seen a property that I really like. What should I do next?",
    answer:
      "Contact the agent immediately to schedule a viewing and secure the property before it goes off the market.",
  },
  {
    question: "What do I need to pay before I can move in?",
    answer:
      "Typically, you’ll need to pay a deposit and the first month’s rent before moving in.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-4 lg:px-12 py-12"
    style={{
        backgroundColor: "var(--background)",
      }}
    >
      {/* Heading */}
          {/* <div>
  <h2 className="text-2xl lg:text-3xl font-semibold relative inline-block"
      style={{ color: "var(--foreground)" }}>
    Frequently Asked Questions
    <span className="absolute left-0 -bottom-3 w-20 h-[3px] bg-cyan-400"></span>
  </h2>
  <p className="text-base lg:text-lg max-w-2xl mt-6"
     style={{ color: "var(--foreground)" }}>
    Find answers to common questions about buying, selling, or renting properties and learn more about our services and processes.
  </p>
</div> */}
  <div style={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>
       <h1
  style={{
    margin: 0,
    fontSize: "38px",
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
    lineHeight: "38px",
    color: "rgb(51, 51, 51)",
    display: "flex",
    alignItems: "baseline",
  }}
>
  <span style={{ color: "#000", marginRight: 10 }}>Frequently Asked</span>
  <span style={{ color: "#0FC6D6", alignItems: "center" }}>
    Questions
    <hr
      style={{
        border: "2px solid #D3F1F8",
        width: "100%",
        marginTop: "1px",
        borderRadius: 10,
      }}
    />
  </span>
</h1>
      <p
      className="text-base lg:text-lg max-w-2xl mt-6"
      style={{ color: "var(--foreground)" }}
    >
      Find answers to common questions about buying, selling, or renting properties and learn more about our services and processes.
    </p>
    </div>
        

      <div className="grid lg:grid-cols-2 gap-8 items-start mt-5">
        {/* Left Support Box */}
        <div className="bg-gray-50 rounded-lg shadow-sm p-8 text-center relative overflow-hidden">
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-cyan-100 rounded-full opacity-40"></div>
          <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-cyan-100 rounded-full opacity-40"></div>

          <div className="w-26 h-26 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-cyan-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold mb-2 text-slate-900">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Can’t find the answer you’re looking for? Our customer support team
            is here to help you 24/7.
          </p>
          <Link
          href={'/contact'}
          >
          <button className="flex items-center gap-2 bg-white border-2 border-cyan-500 text-cyan-600 px-6 py-3 rounded-md font-medium hover:bg-cyan-50 transition mx-auto">
            <Mail className="w-4 h-4 font-bold" /> Contact Support
          </button>
          </Link>
        </div>

        {/* Right FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between text-slate-900 font-bold items-center px-6 py-4 text-left hover:bg-gray-50"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-cyan-500" strokeWidth={3} />
                ) : (
                  <Plus className="w-5 h-5 text-cyan-500" strokeWidth={3} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
