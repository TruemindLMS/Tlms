"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import SectionCard from "../userSettings/components/sectioncard";
import { PersonalInfoForm } from "../userSettings/components/personalInfo";
import { address } from "framer-motion/client";
import Security from "../userSettings/components/security";

const UserProfile = () => {
  const USER = {
    FirstName: "Eldora",
    lastName: " Starling",
    // username: "eldora.s",
    role: "UI/UX Intern",
    email: "eldora.starling@mail.com",
    address: "123 Main St, Springfield, USA",
    birthday: "2007-06-05",
    phone: "+1 (555) 748-2296",
    location: "Springfield, USA",
    postalCode: "ERT 52312",
    avatarInitials: "ES",
    // country: "United States of America",
    // cityState: "California, USA",
    // taxId: "555-1234",
    // twoFactor: true,
    // loginAlert: true,
  };
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");

  const options = ["Female", "Male"];
  return (
    <div className="flex flex-col gap-3 w-10/12 mx-auto py-6 md:pb-10">
      <div className="flex flex-col items-center">
        <div className="relative ">
          <Image
            src={"/img/user-pic.png"}
            alt="user"
            height={200}
            width={200}
            className="h-40 w-40 "
          />
          <Image
            className="absolute right-1 bottom-0 h-9 w-9"
            src={"/img/edit-pic.png"}
            alt="edit"
            height={36}
            width={36}
          />
        </div>
        <p className=" text-[44px] font-extrabold text-[#1C2A39]">
          {USER.FirstName} {USER.lastName}
        </p>
        <p className="text-lg md:text-3xl font-medium text-[#6B7280]">
          {USER.role}
        </p>
      </div>
      <SectionCard>
        <div>
          <p className="text-3xl font-semibold text-[#1C2A39]">
            Personal information
          </p>
          <div className=" flex items-center gap-10 mt-3">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer"
              >
                <p className="text-xl font-medium text-[#1C2A39] ">{option}</p>
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={selected === option}
                  onChange={() => setSelected(option)}
                  className=" hidden"
                />
                <span className="w-6 h-6 rounded-full border-2 border-[#CFE0D7] flex items-center justify-center ">
                  <span
                    className={` ${selected === option ? "bg-primary-500" : "bg-transparent"} w-3 h-3 rounded-full transition-colors`}
                  />
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <PersonalInfoForm user={USER} />
        </div>
      </SectionCard>
      <SectionCard>
        <Security  />
      </SectionCard>

      {/* <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Profile 📚
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Here is your profile</p>
      </div> */}
      {/* <div className="py-6 md:py-8 px-3 md:px-4 flex justify-between shadow-md shadow-gray-200 rounded-lg">
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
          href={"/dash/settings"}
        >
          <Settings className="" />
          <span
            className={` absolute right-5 -top-5 ${visible ? "block" : "hidden"}`}
          >
            Settings
          </span>
        </Link>
      </div> */}
      {/* <div className="py-6 md:py-8 px-3 md:px-4 shadow-md shadow-gray-200 rounded-lg">
        <p className="text-2xl md:text-3xl font-semibold text-[#1C2A39]">
          Learning Summary
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full mt-4 md:mt-8">
          <div className="flex flex-col items-center">
            <p className=" text-2xl md:text-3xl font-semibold text-[#1C2A39]">
              3
            </p>
            <p className=" text-xl md:text-[28px] font-normal text-[#9BA5A0] ">
              Enrolled
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className=" text-2xl md:text-3xl font-semibold text-[#1C2A39]">
              2
            </p>
            <p className=" text-xl md:text-[28px] font-normal text-[#9BA5A0] ">
              Completed
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className=" text-2xl md:text-3xl font-semibold text-[#1C2A39]">
              75%
            </p>
            <p className=" text-xl md:text-[28px] font-normal text-[#9BA5A0] ">
              Progress
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 md:mt-8">
          <div className=" col-span-2 bg-primary-500 h-1.5 rounded-2xl"></div>
          <div className="bg-[#9BA5A0] h-1.5 rounded-2xl"></div>
        </div>
      </div> */}
      {/* <div className="py-8 px-4 shadow-md shadow-gray-200 rounded-lg">
        <p className="text-2xl md:text-3xl font-semibold text-[#1C2A39]">
          Achievements
        </p>
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
      </div> */}
    </div>
  );
};

export default UserProfile;
