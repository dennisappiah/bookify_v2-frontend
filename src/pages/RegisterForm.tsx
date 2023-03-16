import React, {useContext, useState, useEffect} from 'react'
import CustomInput from '../components/common/CustomInput';
import { RegisterContext } from './../context/UserContext';

const RegisterForm = () => {
  //get register state from UserContext
  const { register,errors, handleRegisterSubmit, handleChange, submitted } = useContext(RegisterContext);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(Object.values(errors).every(error => error === ''));
  }, [errors]);

  return (
    <form onSubmit={handleRegisterSubmit}>
      <CustomInput  
      name='email' 
      value={register.email} 
      error={errors.email} 
      label="Username" 
      type='email'
      onChange={handleChange}
      />
      <CustomInput  
      name='password' 
      value={register.password} 
      error={errors.password} 
      label="Password" 
      type='password'
      onChange={handleChange}
      />
      <CustomInput  
      name='name' 
      value={register.name} 
      error={errors.name} 
      label="Name" 
      type='text'
      onChange={handleChange}
      />
      <button disabled={ !isValid || submitted}  type="submit" className="btn btn-primary">Register</button>
    </form>
  )
}

export default RegisterForm