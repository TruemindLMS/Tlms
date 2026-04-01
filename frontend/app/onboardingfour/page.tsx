import { TickCircle } from "iconsax-react";
import { BadgeCheck, CheckIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function OnboardingFour() {
  const name = "Ethan"
  return (
    <section className="min-h-screen w-full flex flex-col justify-between items-center bg-[#f6f8f7] py-8">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 mx-auto">
        <div className="bg-[#EAF3DE] rounded-xl p-6 text-center mb-8">

          <div className="flex flex-col items-center justify-center gap-3">

            <BadgeCheck className="w-16 h-16 rounded-md text-green-700" />
            <h2 className="text-[18px] font-medium text-[#085041] mb-1">
              You&apos;re all set up, {name}
            </h2>
            <p className="text-sm text-[#0F6E56] leading-relaxed">
              All 4 steps complete. Your workspace is ready —<br />
              your courses, tools, and cohort are waiting.
            </p>
          </div>
        </div>

        {/* STEPS RECAP */}
        <div className="flex flex-wrap gap-2 mb-8">
          {steps.map((step) => (
            <div
              key={step.label}
              className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-[12px] font-semibold text-gray-500"
            >
              <div className="w-[18px] h-[18px] rounded-full bg-[#EAF3DE] flex items-center justify-center flex-shrink-0">
                <CheckIcon size={10} />
              </div>
              {step.label}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-700 text-white text-[14px] font-medium hover:bg-green-500 transition-colors"
          >
            Go to my dashboard
            <ChevronRight />
          </Link>

          <Link
            href="/assignments"
            className="inline-flex items-center px-5 py-2.5 rounded-lg border border-gray-200 text-[14px] text-gray-500 hover:bg-gray-50 transition-colors"
          >
            View assignments
          </Link>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { label: "Profile set up" },
  { label: "Track selected" },
  { label: "Tools installed" },
  { label: "First session done" },
];