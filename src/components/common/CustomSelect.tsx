import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";

interface SelectProps {
  _id?: string;
  name: string;
  options: { _id: string; name: string }[];
  label: string;
  error: string | undefined;
  onChange: any;
}

const CustomSelect: React.FC<SelectProps> = ({
  label,
  options,
  error,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{label}</label>
      <select
        {...field}
        {...props}
        onChange={onChange}
        className="form-control"
      >
        <option value=""></option>
        {options.map((option) => {
          // Check if the option is the "All Categories" option
          // Return an empty string to skip rendering this option
          if (option._id === "") {
            return "";
          } else {
            // Render the option dynamically
            return (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            );
          }
        })}
      </select>
      {meta.touched && meta.error ? (
        <div className="alert alert-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
