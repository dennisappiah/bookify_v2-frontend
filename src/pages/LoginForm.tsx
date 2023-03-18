import React, {useState, useEffect} from 'react'
import CustomInput from '../components/common/CustomInput';
// import LoginSchema for validation
import { loginSchema } from '../schemas/loginSchema';
///import authservice
import { loginUser } from '../services/AuthService';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';


const LoginForm = () => {
  //account state
  const [account, setAccount] = useState({email:"", password:""});
  //errors state
  const [errors, setErrors] = useState({email:"", password:""});
  //submitted state
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(Object.values(errors).every(error => error === ''));
  }, [errors]);
  const location = useLocation();
  const navigate = useNavigate();
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
  const handleLoginSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {data : jwt} = await loginUser(account.email, account.password);
      localStorage.setItem('token', JSON.stringify(jwt));
      // for  full reloading the application after login to current location of user
      const { state} = location;
      window.location = state ? state.from.pathname : "/" ;
      setSubmitted(true);
    } catch (ex: any) {
      if ((ex as any).response && (ex as any).response.status === 400) {
        setErrors({ ...errors, email: (ex as any).response.account });
      }
    }
  };

  //handle email and password change
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setAccount(account => ({ ...account, [name]: value }));
    // validateProperty(name);
  };

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [account, submitted]);

   //  redirect /login route to / root route if youre already logged in
   if (getCurrentUser()) {
    navigate('/', { replace: true });
  }

  return (
    <form onSubmit={handleLoginSubmit}>
      <CustomInput  
      name='email' 
      value={account.email} 
      error={errors.email} 
      label="Username" 
      type='email'
      onChange={handleChange}
      />
      <CustomInput  
      name='password' 
      value={account.password} 
      error={errors.password} 
      label="Password" 
      type='password'
      onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}

export default LoginForm