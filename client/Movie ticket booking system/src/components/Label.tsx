import React from "react";

interface LabelProps {
  title: string;
  mandatory?: boolean;
  heading?: boolean;
  [key: string]: any; // to allow for additional props
}

const Label: React.FC<LabelProps> = ({
  title,
  mandatory,
  heading,
  ...rest
}: LabelProps) => {
  return (
    <>
      {heading ? (
        <label className="col-sm-12 col-form-label long-c-heading">
          <h5>
            {title}
            {mandatory && <span>*</span>}
          </h5>
        </label>
      ) : (
        <label className="col-sm-4 col-form-label">
          {title}
          {mandatory && <span className="text-danger">*</span>}
        </label>
      )}
    </>
  );
};

export default Label;
