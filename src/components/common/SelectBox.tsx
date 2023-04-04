import React from "react";

interface SelectBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectBox = ({ value, onChange }: SelectBoxProps) => {
  return (
    <div className="container">
      <input
        value={value}
        type="text"
        name="query"
        className="form-control my-3"
        onChange={onChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SelectBox;
