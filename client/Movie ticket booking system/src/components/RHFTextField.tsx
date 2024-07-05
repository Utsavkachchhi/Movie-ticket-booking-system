import React from "react";
import { FieldError, useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface RHFTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const RHFTextField: React.FC<RHFTextFieldProps> = ({ name, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name] as FieldError | undefined;
  return (
    <>
      <input {...register(name)} {...rest} />
      <ErrorMessage error={error ? { message: error.message || "" } : null} />
    </>
  );
};
export default RHFTextField;
