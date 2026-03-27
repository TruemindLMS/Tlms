"use client";

import { useState } from "react";


import SectionCard from "../sectioncard";
import { Edit2Icon, SaveIcon, User } from "lucide-react";
import FormField from "../form-field";
import { UserProps } from "../..";

export function PersonalInfoForm({user}: {user: UserProps}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SectionCard title="Personal Information" icon={User}>
      <div>
        <div className="grid  md:grid-cols-2 gap-4">
          <FormField
            label="Username"
            placeholder={user.name}
            value={user.name}
          />
          <FormField
            label="Bithday"
            placeholder={user.birthday}
            value={user.birthday }
          />
          <FormField
            label="Email"
            placeholder={user.email}
            value={user.email}
          />
          <FormField
            label="Phone Number"
            placeholder={user.phone || "+234 867 456 7392"}
            value={user.phone || "+234 867 456 7392"}
          />
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
    </SectionCard>
  );
}
