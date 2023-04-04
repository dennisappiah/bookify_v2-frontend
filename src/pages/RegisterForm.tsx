import React, { useContext, useState, useEffect } from "react";
import CustomInput from "../components/common/CustomInput";
// import resgisterSchema for validation
import { registerSchema } from "./../schemas/registerSchema";
//import services
import { registerUser } from "../services/userService";
import { storeToken } from "../services/AuthService";

const RegisterForm = () => {
  //register state
  const [data, setData] = useState({ email: "", password: "", name: "" });
  //errors state
  const [errors, setErrors] = useState({ email: "", password: "", name: "" });
  //submitted state
  const [submitted, setSubmitted] = useState(false);

  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(Object.values(errors).every((error) => error === ""));
  }, [errors]);

  //validating Form after submission
  const validateForm = async (): Promise<boolean> => {
    try {
      await registerSchema.validate(data, { abortEarly: false });
      setErrors({ email: "", password: "", name: "" });
      return true;
    } catch (err: any) {
      const newErrors = err.inner.reduce((acc: any, curr: any) => {
        return { ...acc, [curr.path]: curr.message };
      }, {});
      setErrors(newErrors);
      return false;
    }
  };

  //validating individual property of register state
  const validateProperty = async (field: string) => {
    try {
      await registerSchema.validateAt(field, data);
      setErrors((errors) => ({ ...errors, [field]: "" }));
    } catch (err: any) {
      setErrors((errors) => ({ ...errors, [field]: err.message }));
    }
  };

  //handle Login Submit & validating form
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser(data.email, data.password, data.name);
      // logging in the user upon registration
      storeToken(response.headers["x-auth-token"]);
      // for  full reloading the application after login
      window.location = "/" as unknown as Location;
      setSubmitted(true);
    } catch (ex: any) {
      if ((ex as any).response && (ex as any).response.status === 400) {
        setErrors({ ...errors, email: (ex as any).response.data });
      }
    }
  };

  //handle email and password change
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setData((data) => ({ ...data, [name]: value }));
    // validateProperty(name);
  };

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [data, submitted]);

  return (
    <form onSubmit={handleSave}>
      <CustomInput
        name="email"
        value={data.email}
        error={errors.email}
        label="Username"
        type="email"
        onChange={handleChange}
      />
      <CustomInput
        name="password"
        value={data.password}
        error={errors.password}
        label="Password"
        type="password"
        onChange={handleChange}
      />
      <CustomInput
        name="name"
        value={data.name}
        error={errors.name}
        label="Name"
        type="text"
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
