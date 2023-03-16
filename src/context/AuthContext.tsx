import React, {createContext, useState, useEffect} from 'react'
// import LoginSchema for validation
import { loginSchema } from '../schemas/loginSchema';


interface IAuthContext{
  account: {email: string, password: string}
  errors: {email: string, password: string}
  handleLoginSubmit: (e : React.FormEvent<HTMLFormElement>) => void
  handleChange : (e: React.FormEvent<HTMLInputElement>) => void
  submitted: boolean
}

type AuthProviderProps = {
  children: React.ReactNode
}

//create context
export const AuthContext = createContext<IAuthContext>({
   account: {email:"", password:""},
   errors: {email:"", password:""},
   handleLoginSubmit: () => {},
   handleChange: () => {},
   submitted: false
});

const AuthProvider = ({children}: AuthProviderProps) => {
  //account state
  const [account, setAccount] = useState({email:"", password:""});
  //errors state
  const [errors, setErrors] = useState({email:"", password:""});
  //submitted state
  const [submitted, setSubmitted] = useState(false);

  //validating Form after submission
  const validateForm = async (): Promise<boolean> => {
    try {
      await loginSchema.validate(account, { abortEarly: false });
      setErrors({email:"", password:""});
      return true;
    } catch (err: any) {
      const newErrors = err.inner.reduce((acc:any, curr:any) => {
        return { ...acc, [curr.path]: curr.message };
      }, {});
      setErrors(newErrors);
      return false;
    }
  };
  
  //validating individual property of account state
  const validateProperty = async (field: string) => {
    try {
      await loginSchema.validateAt(field, account);
      setErrors(errors => ({ ...errors, [field]: "" }));
    } catch (err: any) {
      setErrors(errors => ({ ...errors, [field]: err.message }));
    }
  };
  
  //handle Login Submit & validating form
  const handleLoginSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    setSubmitted(true);
    validateProperty("email");
    validateProperty("password");
  };

  //handle email and password change
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setAccount(account => ({ ...account, [name]: value }));
    validateProperty(name);
  };

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [account, submitted]);
    
  return (
    <AuthContext.Provider 
      value=
      {{account, 
        errors, 
        handleLoginSubmit, 
        handleChange,
        submitted
      }}>{children}
    </AuthContext.Provider>
  )
}

export default AuthProvider