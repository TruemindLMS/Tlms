"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer?: string;
  isOpen: boolean;
}

const faqs: Omit<FAQItem, "isOpen">[] = [
  {
    question: "What is this Learning Management System (LMS)?",
    answer:
      "This LMS is a digital platform that allows students to access courses, watch lessons, take quizzes, and track their learning progress all in one place.",
  },
  {
    question: "Who can use this platform?",
    answer:
      "The platform is designed for students, instructors, and administrators. Each user role has specific features tailored to their needs.",
  },
  {
    question: "How do I register for an account?",
    answer:
      "Click on the Sign Up button, fill in your details, and verify your email address. Once completed, you can log in and start learning immediately.",
  },
  {
    question: "Can I access courses on my mobile device?",
    answer:
      "Yes, the LMS is fully responsive and works on smartphones, tablets, and desktops for a seamless learning experience.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "Browse available courses, select the one you’re interested in, and click the Enroll button. Some courses may require payment before access is granted.",
  },
  {
    question: "Are there free courses available?",
    answer:
      "Yes, we offer both free and premium courses. You can filter courses by price to find free learning resources.",
  },
  {
    question: "How is my progress tracked?",
    answer:
      "Your progress is automatically tracked as you complete lessons, quizzes, and assignments. You can view your progress on your dashboard.",
  },
  {
    question: "Will I receive a certificate after completing a course?",
    answer:
      "Yes, certificates are awarded for eligible courses once all requirements are completed successfully.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password via email.",
  },
  {
    question: "Can instructors upload their own courses?",
    answer:
      "Yes, instructors can create, upload, and manage their courses, including videos, quizzes, and assignments through their dashboard.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team via the Help section or contact us through email. We are available to assist you with any issues.",
  },
];

export default function ViralLinkFAQ() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>(
    faqs.map((faq) => ({ ...faq, isOpen: false })),
  );

  const toggleFAQ = (index: number) => {
    setFaqItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, isOpen: !item.isOpen }
          : { ...item, isOpen: false },
      ),
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[640px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold text-primary-900 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-3xl md:text-[34px] hidden font-semibold text-green-700 leading-tight">
            We’ve got answers
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqItems.map((item, index) => {
            const isOpen = item.isOpen;

            return (
              <motion.div
                key={index}
                layout
                initial={false}
                animate={{
                  rotate: isOpen ? 4 : 0,
                  y: isOpen ? -6 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                }}
                className="relative"
              >
                {/* Glow Shadow */}
                {isOpen && (
                  <div className="absolute inset-x-6 -bottom-3 h-8 bg-green-500/30 blur-2xl rounded-full" />
                )}

                {/* Card */}
                <div
                  className={`relative bg-white rounded-2xl px-6 py-5 transition-all duration-300
                  ${isOpen
                      ? "shadow-[0_20px_60px_rgba(124,58,237,0.18)]"
                      : "shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
                    }`}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="text-[15.5px] md:text-[16px] font-medium text-gray-900 pr-6 leading-snug">
                      {item.question}
                    </span>

                    {/* Icon */}
                    <span className="text-3xl text-green-700 font-light">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && item.answer && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="mt-3 text-[14.5px] text-primary-800 leading-relaxed"
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
