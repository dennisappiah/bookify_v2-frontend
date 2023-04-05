import loginSchema from "../schemas/loginSchema";
import { Formik, Field, FormikHelpers } from "formik";
import { loginUser } from "../services/AuthService";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/AuthService";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (
    values: LoginFormValues,
    { setErrors }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const { data: jwt } = await loginUser(values.email, values.password);
      localStorage.setItem("token", JSON.stringify(jwt));
      // for  full reloading the application after login to current location of user
      const { state } = location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex: any) {
      if ((ex as any).response && (ex as any).response.status === 400) {
        setErrors({ email: "Invalid email or password" });
      }
    }
  };

  //  redirect /login route to / root route if youre already logged in
  if (getCurrentUser()) {
    navigate("/", { replace: true });
  }

  return (
    <div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
              <div style={{ marginTop: "15px" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
