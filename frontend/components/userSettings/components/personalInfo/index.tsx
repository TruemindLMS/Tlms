"use client";

import { useState } from "react";


import SectionCard from "../sectioncard";
import { Edit2Icon, SaveIcon, User } from "lucide-react";
import FormField from "../form-field";
import { UserProps } from "../..";

export function PersonalInfoForm({user}: {user: UserProps}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            label="FirstName"
            placeholder={user.FirstName}
            value={user.FirstName}
          />
          <FormField
            label="LastName"
            placeholder={user.lastName}
            value={user.lastName}
          />
        </div>
        <FormField label="Email" placeholder={user.email} value={user.email} />
        <FormField
          label="Address"
          placeholder={user.address}
          value={user.address}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            label="Phone Number"
            placeholder={user.phone || "+234 867 456 7392"}
            value={user.phone || "+234 867 456 7392"}
          />
          <FormField
            label="Date of Birth"
            placeholder={user.birthday}
            value={user.birthday}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            label="Date of Birth"
            placeholder={user.location}
            value={user.location}
          />
          <FormField
            label="Postal Code"
            placeholder={user.postalCode}
            value={user.postalCode}
          />
        </div>
      </div>
      {/* {isEditing && (
          <div className="flex justify-end mt-4">
            <button
              type="button"
              // onClick={() => setEditPersonal(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600
                    text-sm text-white font-medium transition-colors duration-150"
            >
              <SaveIcon />
              Save Changes
            </button>
          </div>
        )} */}
      {/* <button
          type="button"
          // onClick={() => setEditPersonal((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700
                  font-medium transition-colors"
        >
          <Edit2Icon />
          {isEditing ? "Cancel" : "Edit"}
        </button> */}
    </div>
  );
}
