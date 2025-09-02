// components/FAQ.jsx
"use client";

import { useState } from "react";
import { Plus, Minus, Mail } from "lucide-react";

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
        <div className="text-left mb-10">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Frequently Asked <span className="text-cyan-500">Questions</span>
          </h2>
          <p
            className="text-base lg:text-lg max-w-2xl"
            style={{ color: "var(--foreground)" }}
          >
           Find answers to common questions about buying, selling, or renting properties and learn more about our services and processes.
          </p>
        </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Support Box */}
        <div className="bg-gray-50 rounded-lg shadow-sm p-8 text-center relative overflow-hidden">
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-cyan-100 rounded-full opacity-40"></div>
          <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-cyan-100 rounded-full opacity-40"></div>

          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-cyan-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Can’t find the answer you’re looking for? Our customer support team
            is here to help you 24/7.
          </p>
          <button className="flex items-center gap-2 bg-white border border-cyan-500 text-cyan-600 px-6 py-3 rounded-md font-medium hover:bg-cyan-50 transition mx-auto">
            <Mail className="w-4 h-4" /> Contact Support
          </button>
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
                className="w-full flex justify-between items-center px-6 py-4 text-left font-medium hover:bg-gray-50"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-cyan-500" />
                ) : (
                  <Plus className="w-5 h-5 text-cyan-500" />
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
