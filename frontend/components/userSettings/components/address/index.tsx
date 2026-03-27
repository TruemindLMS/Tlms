"use client";

import { useState } from "react";

import { Edit2Icon, LocationEditIcon, SaveIcon } from "lucide-react";
import SectionCard from "../sectioncard";
import FormField from "../form-field";
import { Location } from "iconsax-react";
import { UserProps } from "../..";

const Address = ({ user }: { user: UserProps }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SectionCard title="Address" icon={LocationEditIcon}>
      {/* <button
        type="button"
        // onClick={() => setEditPersonal((v) => !v)}
        className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700
                  font-medium transition-colors"
      >
        <Edit2Icon />
        {isEditing ? "Cancel" : "Edit"}
      </button> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Country" placeholder={user.country} value={user.country } />
        <FormField label="State/City" placeholder={user.cityState} value={user.cityState } />
        <FormField
          label="Street Address"
          placeholder="123 Main St"
          value={ "123 Main St"}
        />
        <FormField label="Zip Code" placeholder={user.postalCode} value={user.postalCode } />
      </div>

      {/* {isEditing && (
        <div className="flex justify-end mt-4">
          <button
            type="button"
            // onClick={() => setEditAddress(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600
                    text-sm text-white font-medium transition-colors duration-150"
          >
            <SaveIcon />
            Save Changes
          </button>
        </div>
      )} */}
    </SectionCard>
  );
};

export default Address;