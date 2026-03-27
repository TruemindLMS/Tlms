"use client";

import { useState } from "react";

import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserProfile = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-3 max-w-6xl w-10/12 mx-auto py-20">
      <div className=" py-6 md:py-8 px-3 md:px-4 shadow-md shadow-gray-200 rounded-lg">
        <p className="text-3xl md:text-4xl text-[#1C2A39] font-semibold">
          Profile
        </p>
      </div>
      <div className="py-6 md:py-8 px-3 md:px-4 flex justify-between shadow-md shadow-gray-200 rounded-lg">
        <div>
          <p className=" text-xl md:text-[28px] font-semibold text-[#1C2A39]">
            Bankole Shittu
          </p>
          <div className="flex gap-3 md:gap-4 mt-4 md:mt-8">
            <Image
              src={"/img/User-72.png"}
              alt="User Profile"
              width={72}
              height={72}
              className=" w-10 md:w-14 h-full"
            />
            <div>
              <p className=" text-lg md:text-2xl font-medium text-[#1C2A39]">
                UI/UX Intern
              </p>
              <p className=" text-lg md:text-2xl font-regular text-[#1C2A39] mt-4">
                UI/UX Designer
              </p>
            </div>
          </div>
        </div>
        <Link
          className="relative"
          onMouseEnter={() => setVisible(!visible)}
          onMouseLeave={() => setVisible(false)}
          href={"/settings"}
        >
          <Settings className="" />
          <span
            className={` absolute right-5 -top-5 ${visible ? "block" : "hidden"}`}
          >
            Settings
          </span>
        </Link>
      </div>
      <div className="py-6 md:py-8 px-3 md:px-4 shadow-md shadow-gray-200 rounded-lg">
        <p className="text-2xl md:text-3xl font-semibold text-[#1C2A39]">
          Learning Summary
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full mt-4 md:mt-8">
          <div className="flex flex-col items-center">
            <p className=" text-2xl md:text-3xl font-semibold text-[#1C2A39]">3</p>
            <p className=" text-xl md:text-[28px] font-normal text-[#9BA5A0] ">Enrolled</p>
          </div>
          <div className="flex flex-col items-center">
            <p className=" text-2xl md:text-3xl font-semibold text-[#1C2A39]">2</p>
            <p className=" text-xl md:text-[28px] font-normal text-[#9BA5A0] ">Completed</p>
          </div>
          <div className="flex flex-col items-center">
            <p className=" text-2xl md:text-3xl font-semibold text-[#1C2A39]">75%</p>
            <p className=" text-xl md:text-[28px] font-normal text-[#9BA5A0] ">Progress</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 md:mt-8">
          <div className=" col-span-2 bg-primary-500 h-1.5 rounded-2xl"></div>
          <div className="bg-[#9BA5A0] h-1.5 rounded-2xl"></div>
        </div>
      </div>
      <div className="py-8 px-4 shadow-md shadow-gray-200 rounded-lg">
        <p className="text-2xl md:text-3xl font-semibold text-[#1C2A39]">Achievements</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full mt-4 md:mt-8">
          <div className="h-75 rounded-lg flex flex-col gap-12 justify-center items-center shadow-gray-200 shadow-md bg-[#CFE0D7]">
            <Image
              src={"/img/course-complete.png"}
              alt="Completed Course"
              width={26}
              height={26}
              className="w-6 "
            />

            <p className=" text-xl md:text-2xl font-medium text-[#1C2A39]">
              Completed Course
            </p>
            <p className=" text-base md:text-lg font-normal text-[#1C2A39]">
              UI/UX Intermediate
            </p>
          </div>
          <div className="h-75 rounded-lg flex flex-col gap-12 justify-center items-center shadow-gray-200 shadow-md bg-[#CFE0D7]">
            <Image
              src={"/img/award-trophy.png"}
              alt="Completed Course"
              width={26}
              height={26}
              className="w-6 "
            />

            <p className=" text-xl md:text-2xl font-medium text-[#1C2A39]">
              Completed Course
            </p>
            <p className=" text-base md:text-lg font-normal text-[#1C2A39]">
              UI/UX Intermediate
            </p>
          </div>
          <div className="h-75 rounded-lg flex flex-col gap-12 justify-center items-center shadow-gray-200 shadow-md bg-[#CFE0D7]">
            <Image
              src={"/img/award-star.png"}
              alt="Completed Course"
              width={26}
              height={26}
              className="w-6 "
            />

            <p className=" text-xl md:text-2xl font-medium text-[#1C2A39]">
              Completed Course
            </p>
            <p className=" text-base md:text-lg font-normal text-[#1C2A39]">
              UI/UX Intermediate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
