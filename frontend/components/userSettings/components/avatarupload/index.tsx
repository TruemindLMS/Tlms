"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "iconsax-react";
import { Delete, UploadIcon } from "lucide-react";
import SectionCard from "../sectioncard";
import { UserProps } from "../..";


export function AvatarUpload( {user} : {user : UserProps}) {
  return (
    <SectionCard>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center ">
            <span className="text-lg font-semibold text-white "> {user.avatarInitials} </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold  truncate">
              {user.name}
            </p>
            <p className="text-sm  truncate">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200
                    text-sm text-red-500 hover:bg-red-50 hover:border-red-300 transition-colors duration-150"
          >
            <Delete />
            Delete
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                    bg-green-500 hover:bg-green-600 text-sm text-white transition-colors duration-150"
          >
            <UploadIcon />
            Update
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
