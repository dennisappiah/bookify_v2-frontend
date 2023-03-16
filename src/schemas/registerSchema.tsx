import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    email: yup
        .string().email("Please enter a valid email")
        .required('Required'),
    password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .required('Required'),
    name: yup.string().required()
});


export default registerSchema