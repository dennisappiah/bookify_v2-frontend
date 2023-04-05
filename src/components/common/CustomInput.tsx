import React, { useState } from "react";

interface InputProps {
  name: string;
  value: string | number;
  label: string;
  error: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const CustomInput = ({
  name,
  value,
  label,
  error,
  type,
  onChange,
  onBlur,
}: InputProps) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    if (onBlur) onBlur();
  };
  return (
    <div className="mb-3 form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        value={value}
        name={name}
        type={type}
        className="form-control"
        onChange={onChange}
        onBlur={handleBlur}
      />
      {touched && error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default CustomInput;
