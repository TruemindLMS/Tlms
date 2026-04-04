
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, placeholder, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Label className=" text-base lg:text-xl text-[#1C2A39] font-normal ">
          {label}{" "}
        </Label>
        <Input
          ref={ref}
          className=" w-full dark:text-white text-[#6B7280] font-medium h-10 rounded-sm border-none bg-[#F3F4F6] outline-none focus:ring-0 focus:outline-none "
          placeholder={placeholder}
          {...props}
        />
        {error && <p className="text-sm text-red-500"> {error} </p>}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
