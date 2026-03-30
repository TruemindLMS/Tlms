"use client";

import { useState } from "react";

import {
  BadgeCheck,
  BrainCog,
  BriefcaseBusinessIcon,
  TrendingUp,
} from "lucide-react";

const Onboarding3 = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  interface Goal {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
  }
  const goals: Goal[] = [
    {
      id: "upskilling",
      title: "Upskilling",
      description: "Deepen my current technical expertise and stay relevant.",
      icon: TrendingUp,
    },
    {
      id: "career-change",
      title: "Career Change",
      description: "Transition into a new industry or high-demand role.",
      icon: BriefcaseBusinessIcon,
    },
    {
      id: "personal-interest",
      title: "Personal Interest",
      description: "Learn new things for the joy of discovery and curiosity.",
      icon: BadgeCheck,
    },
    {
      id: "certification",
      title: "Certification",
      description: "Gain industry-recognized credentials to boost my CV.",
      icon: BrainCog,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f6f8f7]">
      {/* Top Step Indicator */}
      <div className="text-center w-full text-sm tracking-widest text-gray-400 mb-6 mt-4">
        STEP 3 OF 4
      </div>
      <div className="flex flex-1 items-center bg-white justify-center px-4">
        <div className="rounded-2xl w-full max-w-xl p-8">
          <p className="text-2xl md:text-[30px] font-extrabold text-[#1A1F1D] mb-2">
            What are your goals?
          </p>
          <p className="text-base md:text-lg font-normal text-[#404940]">
            Select the primary outcomes you hope to achieve with TalentFlow.
          </p>
          <div className="mt-8 grid gap-3">
            {goals.map((goal) => {
              const isSelected = openItems.includes(goal.id);
              return (
                <div
                  key={goal.title}
                  onClick={() => toggleItem(goal.id)}
                  className={`p-2 sm:p-4 rounded-xl text-black cursor-pointer ${openItems.includes(goal.id) ? "bg-primary-500 text-white" : ""
                    }`}
                >
                  <Onboarding3Data
                    icon={goal.icon}
                    title={goal.title}
                    description={goal.description}
                    isSelected={isSelected}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding3;

const Onboarding3Data = ({
  title,
  description,
  icon: Icon,
  isSelected,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  isSelected: boolean;
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-center ">
      <div
        className={`h-11 w-11 flex items-center justify-center rounded-md bg-[#E7E8E6] ${isSelected ? "bg-white/20" : ""
          }`}
      >
        {Icon && (
          <Icon
            className={`text-primary-500 ${isSelected ? "text-white" : ""}`}
          />
        )}
      </div>

      <div className=' flex flex-col sm:flex-row  sm:items-center justify-between w-full '>
        <div>
          <p className={`text-lg font-bold`}>{title}</p>
          <p className={`text-sm font-normal`}>{description}</p>
        </div>

        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className={`
          ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-0"}
          w-6 h-6
          rounded-full
          bg-white
          appearance-none
          cursor-pointer
          relative
          after:content-["✓"]
          after:text-black
          after:absolute
          after:top-1/2
          after:left-1/2
          after:-translate-x-1/2
          after:-translate-y-1/2
          after:text-sm
          after:font-bold
          after:hidden
          checked:after:block
        `}
        />
      </div>
    </div>
  );
};