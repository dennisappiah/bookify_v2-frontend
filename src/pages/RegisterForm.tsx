import { registerSchema } from "./../schemas/registerSchema";
//import services
import { registerUser } from "../services/userService";
import { storeToken } from "../services/AuthService";
import { Formik, Field, FormikHelpers } from "formik";

interface RegisterFormValues {
  email: string;
  password: string;
  name: string;
}

const RegisterForm = () => {
  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    name: "",
  };

  const handleFormSubmit = async (
    values: RegisterFormValues,
    { setErrors }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const response = await registerUser(
        values.email,
        values.password,
        values.name
      );
      // logging in the user upon registration
      storeToken(response.headers["x-auth-token"]);
      // for  full reloading the application after login
      window.location = "/" as unknown as Location;
    } catch (ex: any) {
      if ((ex as any).response && (ex as any).response.status === 400) {
        setErrors({ email: "User is already registered" });
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
          isSubmitting,
        }) => (
          <div className="mb-3 form-group">
            <form onSubmit={handleSubmit}>
              {/* Email field */}
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                id="email"
                name="email"
                className="form-control"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.email && errors.email ? errors.email : undefined}
              />
              {touched.email && errors.email && (
                <div className="alert alert-danger">{errors.email}</div>
              )}
              {/* Password field */}
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                id="password"
                name="password"
                className="form-control"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={
                  touched.password && errors.password
                    ? errors.password
                    : undefined
                }
              />
              {touched.password && errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
              {/* Name field */}
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field
                id="name"
                name="name"
                className="form-control"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && errors.name ? errors.name : undefined}
              />
              {touched.name && errors.name && (
                <div className="alert alert-danger">{errors.name}</div>
              )}
              <div style={{ marginTop: "15px" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
