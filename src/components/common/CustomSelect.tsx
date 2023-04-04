import React from "react";

interface SelectProps {
  name: string;
  options: { _id: string; name: string }[];
  label: string;
  error: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const CustomSelect: React.FC<SelectProps> = ({
  name,
  options,
  label,
  error,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        className="form-control"
      >
        <option value=""></option>
        {options.map((option) => {
          // Check if the option is the "All Categories" option
          if (option._id === "") {
            // Return an empty string to skip rendering this option
            return "";
          } else {
            // Render the option normally
            return (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            );
          }
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default CustomSelect;
