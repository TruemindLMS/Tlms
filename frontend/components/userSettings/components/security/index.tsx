

import { SaveIcon, Settings2 } from "lucide-react";
import FormField from "../form-field";
import SectionCard from "../sectioncard"

const Security = () => {
  return (
    <SectionCard title="Security" icon={Settings2}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Old Password"
            placeholder="Enter your old password"
          />
          <FormField
            label="New Password"
            placeholder="Enter your new password"
          />
          <FormField
            label="Confirm New Password"
            placeholder="Confirm your new password"
          />
        </div>
        {/* <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600
                  text-sm text-white font-medium transition-colors duration-150"
        >
          <SaveIcon />
          Update Password
        </button> */}
      </div>
    </SectionCard>
  );
}

export default Security;