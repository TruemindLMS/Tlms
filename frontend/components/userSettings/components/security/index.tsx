

import FormField from "../form-field";

const Security = () => {
  return (
      <div className="flex flex-col gap-4">
        <div className="grid gap-4">
          <FormField
            label="Current Password"
            placeholder="Enter your current password"
          />
          <FormField
            label="New Password"
            placeholder="Enter your new password"
          />
          <FormField
            label="Confirm Password"
            placeholder="Confirm your new password"
          />
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full h-10 rounded-4xl bg-primary-500 hover:bg-emerald-600
                  text-sm text-center text-white font-medium transition-colors duration-150"
        >
          Update Password
        </button>
      </div>
  );
}

export default Security;