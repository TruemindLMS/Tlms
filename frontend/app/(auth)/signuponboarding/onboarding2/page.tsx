"use client";

import { useState } from "react";

type Role = {
  id: string;
  shortLabel: string;
  label: string;
  icon: React.ReactNode;
};

const roles: Role[] = [
  {
    id: "pm",
    shortLabel: "PM",
    label: "Project Management",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    id: "uiux",
    shortLabel: "UI/UX",
    label: "UI/UX Design",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    id: "frontend",
    shortLabel: "Frontend",
    label: "Frontend Development",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "backend",
    shortLabel: "Backend",
    label: "Backend Development",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: "graphic",
    shortLabel: "Graphic Design",
    label: "Graphic Design",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: "social",
    shortLabel: "Social Media",
    label: "Social Media",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
];

export default function RoleSelection() {
  const [selected, setSelected] = useState<string>("uiux");

  return (
    <div className="min-h-screen bg-[#f5f5f3] flex items-center justify-center font-sans">

      {/* ── MOBILE ── */}
      <div className="flex lg:hidden flex-col w-full max-w-[390px] min-h-screen bg-[#f5f5f3] relative overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-12 pb-2">
          <div className="flex items-center gap-2 text-[#2d6a4f]">
            <span className="text-lg font-semibold">✕</span>
            <span className="text-lg font-bold">TalentFlow</span>
          </div>
          <button className="text-[#2d6a4f] font-semibold text-base">Skip</button>
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-4">
          <h1 className="text-[28px] font-bold text-gray-900 mb-1">What's your role?</h1>
          <p className="text-gray-400 text-sm mb-8">We'll personalise your learning experience.</p>

          <div className="grid grid-cols-2 gap-3">
            {roles.map((role) => {
              const isSelected = selected === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelected(role.id)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl py-6 px-3 transition-all duration-150 ${isSelected
                    ? "bg-[#2d6a4f] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-100 shadow-sm"
                    }`}
                >
                  <span className={isSelected ? "text-white" : "text-[#2d6a4f]"}>
                    {role.icon}
                  </span>
                  <span className={`text-sm font-semibold text-center leading-tight ${isSelected ? "text-white" : "text-gray-800"}`}>
                    {role.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Decorative arc image — in flow, below cards */}
        <div className="flex justify-center overflow-hidden">
          <img
            src="/img/decorate.png"
            alt=""
            aria-hidden="true"
            className="w-full pointer-events-none select-none"
          />
        </div>

        {/* Bottom — dots + button */}
        <div className="mt-auto px-5 pb-10">
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${i === 0 ? "w-3 h-3 bg-[#2d6a4f]" : "w-3 h-3 bg-gray-300"
                  }`}
              />
            ))}
          </div>
          <button className="w-full bg-[#2d6a4f] text-white font-semibold text-base py-4 rounded-2xl shadow-md active:scale-[0.98] transition-transform">
            Continue
          </button>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex flex-col w-full min-h-screen bg-[#f5f5f3] relative overflow-hidden">

        {/* Decorative arcs — green tinted, matching brand */}
        <svg className="absolute top-0 left-0 pointer-events-none" width="300" height="300" viewBox="0 0 300 300" fill="none">
          <circle cx="-20" cy="150" r="180" stroke="#2d6a4f" strokeWidth="36" strokeOpacity="0.12" />
        </svg>
        <svg className="absolute top-0 right-0 pointer-events-none" width="260" height="260" viewBox="0 0 260 260" fill="none">
          <circle cx="280" cy="80" r="160" stroke="#2d6a4f" strokeWidth="36" strokeOpacity="0.08" />
        </svg>

        {/* Step indicator */}
        <div className="text-center pt-6 text-xs tracking-widest text-gray-400 font-medium uppercase">
          Step 2 of 4
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center flex-1 px-8">
          <h1 className="text-[48px] font-bold text-gray-900 mb-3 text-center">
            What's your role?
          </h1>
          <p className="text-gray-400 text-base text-center mb-12 max-w-md">
            We'll personalise your TalentFlow experience based on your professional discipline.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-[700px] w-full">
            {roles.map((role) => {
              const isSelected = selected === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelected(role.id)}
                  className={`flex flex-col items-center justify-center gap-3 rounded-2xl py-10 px-6 transition-all duration-150 ${isSelected
                    ? "bg-[#2d6a4f] text-white shadow-lg scale-[1.02]"
                    : "bg-white text-gray-700 border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.01]"
                    }`}
                >
                  <span className={isSelected ? "text-white" : "text-[#2d6a4f]"}>
                    {role.icon}
                  </span>
                  <span className={`text-sm font-semibold text-center leading-tight ${isSelected ? "text-white" : "text-gray-800"}`}>
                    {role.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 bg-[#f5f5f3] px-8 py-5">
          <div className="flex items-center justify-center gap-4 max-w-[700px] mx-auto">
            <button className="flex-1 border-2 border-[#2d6a4f] text-[#2d6a4f] font-semibold text-base py-4 rounded-2xl hover:bg-[#f0f7f3] transition-colors">
              Back
            </button>
            <button className="flex-1 bg-[#2d6a4f] text-white font-semibold text-base py-4 rounded-2xl shadow-md hover:bg-[#245a42] transition-colors">
              Continue
            </button>
          </div>
          <p className="text-center text-sm text-gray-400 mt-3 cursor-pointer hover:text-gray-600 transition-colors">
            Skip for now
          </p>
        </div>
      </div>

    </div>
  );
}