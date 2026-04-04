"use client";

import Address from "./components/address";
import { AvatarUpload } from "./components/avatarupload";
import { PersonalInfoForm } from "./components/personalInfo";
import Security from "./components/security";
import Verification from "./components/verification";

export interface UserProps {
  FirstName: string;
  lastName: string;
  // username: string;
  role: string;
  email: string;
  birthday: string;
  phone: string;
  address: string;
  location: string;
  // country: string;
  // cityState: string;
  postalCode: string;
  // taxId: string;
  // twoFactor: boolean;
  // loginAlert: boolean;
  avatarInitials: string;
}

const UserSettings = () => {
  const USER = {
    name: "Eldora Starling",
    username: "eldora.s",
    email: "eldora.starling@mail.com",
    birthday: "2007-06-05",
    phone: "+1 (555) 748-2296",
    country: "United States of America",
    cityState: "California, USA",
    postalCode: "ERT 52312",
    taxId: "555-1234",
    twoFactor: true,
    loginAlert: true,
    avatarInitials: "ES",
  };

  //     //  if (error && !profile) {
  //     //    return (
  //     //      <div className="flex flex-col items-center justify-center h-full gap-3 text-center p-8">
  //     //        <RiErrorWarningLine className="w-10 h-10 text-red-400" />
  //     //        <p className="text-sm text-gray-500 max-w-xs">
  //     //          Failed to load settings:{" "}
  //     //          <span className="text-red-500">{error}</span>
  //     //        </p>
  //     //        <button
  //     //          onClick={() => window.location.reload()}
  //     //          className="text-sm text-emerald-600 underline underline-offset-2"
  //     //        >
  //     //          Retry
  //     //        </button>
  //     //      </div>
  //     //    );
  //     //  }

  return (
    <div className="flex flex-col gap-3 max-w-6xl ml-16 md:ml-20 mx-auto py-6 md:pb-10 ">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl md:text-4xl font-bold ">Settings</h1>
        <p className=" text-sm md:text-base  mt-1">
          Manage your profile, address and security
        </p>
      </div>
      {/* <AvatarUpload user={USER} /> */}
      {/* <PersonalInfoForm user={USER} /> */}
      {/* <Address user={USER} /> */}
      {/* <Verification /> */}
      {/* <Security /> */}
    </div>
  );
};

export default UserSettings;
