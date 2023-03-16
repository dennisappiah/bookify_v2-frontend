import React, {createContext, useState, useEffect} from 'react'
// import resgisterSchema for validation
import { registerSchema } from './../schemas/registerSchema';


interface IRegisterContex{
  register: {email: string, password: string, name:string}
  errors:   {email: string,   password: string, name: string}
  handleRegisterSubmit: (e : React.FormEvent<HTMLFormElement>) => void
  handleChange : (e: React.FormEvent<HTMLInputElement>) => void
  submitted: boolean
};

type RegisterProviderProps = {
  children: React.ReactNode
};

//create context
export const RegisterContext = createContext<IRegisterContex>({
   register: {email:"", password:"", name:""},
   errors: {email:"", password:"", name: ""},
   handleRegisterSubmit: () => {},
   handleChange: () => {},
   submitted: false
});

const RegisterProvider = ({children}: RegisterProviderProps) => {
  //register state
  const [register, setRegister] = useState({email:"", password:"", name:""});
  //errors state
  const [errors, setErrors] = useState({email:"", password:"", name:""});
  //submitted state
  const [submitted, setSubmitted] = useState(false);

  //validating Form after submission
  const validateForm = async (): Promise<boolean> => {
    try {
      await registerSchema.validate(register, { abortEarly: false });
      setErrors({email:"", password:"", name:""});
      return true;
    } catch (err: any) {
      const newErrors = err.inner.reduce((acc:any, curr:any) => {
        return { ...acc, [curr.path]: curr.message };
      }, {});
      setErrors(newErrors);
      return false;
    }
  };
  
  //validating individual property of register state
  const validateProperty = async (field: string) => {
    try {
      await registerSchema.validateAt(field, register);
      setErrors(errors => ({ ...errors, [field]: "" }));
    } catch (err: any) {
      setErrors(errors => ({ ...errors, [field]: err.message }));
    }
  };
  
  //handle Login Submit & validating form
  const handleRegisterSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    setSubmitted(true);
    validateProperty("email");
    validateProperty("password");
    validateProperty("name");
  };

  //handle email and password change
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRegister(register => ({ ...register, [name]: value }));
    validateProperty(name);
  };

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [register, submitted]);
    
  return (
    <RegisterContext.Provider 
      value=
      {{register, 
        errors, 
        handleRegisterSubmit, 
        handleChange,
        submitted
      }}>{children}
    </RegisterContext.Provider>
  )
}

export default RegisterProvider