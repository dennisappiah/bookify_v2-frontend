import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("email is a required field"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .required("password is a required field"),
  name: yup
    .string()
    .min(5, "Name must be at least 5 characters long")
    .required("name is a required field"),
});

export default registerSchema;
