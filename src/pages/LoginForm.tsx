import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext';
import CustomInput from '../components/common/CustomInput';

const LoginForm = () => {
  //get account state from AuthContext
  const { account,errors, handleLoginSubmit, handleChange, submitted } = useContext(AuthContext);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(Object.values(errors).every(error => error === ''));
  }, [errors]);

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
      <button disabled={ !isValid || submitted}  type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}

export default LoginForm