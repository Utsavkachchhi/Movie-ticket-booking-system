import React from "react";

interface ErrorMessageProps {
  error: { message: string } | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  return (
    <label id="curentAdd-error" className="error d-flex" htmlFor="curentAdd">
      {error.message}
    </label>
  );
};

export default ErrorMessage;
