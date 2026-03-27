
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
        <Label className=" ">{label} </Label>
        <Input
          ref={ref}
          className=" w-full dark:text-white border border-slate-200 h-9 rounded-sm outline-none focus:ring-0 focus:outline-none "
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
