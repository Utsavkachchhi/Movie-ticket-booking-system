import React from "react";
import { useFormContext } from "react-hook-form";

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const RHFButton: React.FC<FormButtonProps> = ({ label, ...rest }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <button type="submit" disabled={isSubmitting} {...rest}>
      {isSubmitting ? "Submitting..." : label}
    </button>
  );
};

export default RHFButton;
