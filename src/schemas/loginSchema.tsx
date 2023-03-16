import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, "Username must be at least 3 characters long")
        .required('Username is Required'),
    password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .required('Password is Required')

})

export default loginSchema