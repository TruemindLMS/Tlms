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
    <div className="max-w-5xl w-10/12 mx-auto grid place-content-center">
      <p className=" text-3xl md:text-[40px] font-extrabold text-[#1A1F1D] mb-2 ">
        What are your goals?
      </p>
      <p className=" text-base md:text-lg font-normal text-[#404940]">
        Select the primary outcomes you hope to achieve with TalentFlow.
      </p>
      <div className="mt-8 grid gap-3">
        {goals.map((goal) => {
          const isSelected = openItems.includes(goal.id);
          return (
            <div
              key={goal.title}
              onClick={() => toggleItem(goal.id)}
              className={` p-2 sm:p-4 rounded-md cursor-pointer ${openItems.includes(goal.id) ? "bg-primary-500" : ""}`}
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div
        className={`h-11 w-11 flex items-center justify-center rounded-md bg-[#E7E8E6] ${isSelected ? "bg-white/20" : ""} `}
      >
        {Icon && (
          <Icon
            className={`text-primary-500 ${isSelected ? "text-white" : ""}`}
          />
        )}
      </div>
      <div>
        <p className={`text-lg font-bold`}>{title}</p>
        <p className={`text-sm font-normal `}>{description}</p>
      </div>
      <input
        type="checkbox"
        checked={isSelected}
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
  );
};
