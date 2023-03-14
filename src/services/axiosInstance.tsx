import axios from 'axios';
import logger from "./loggerService";
import { toast } from "react-toastify";
import { getAuthorizationHeader } from './AuthService';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'x-auth-token': getAuthorizationHeader() },
  });
  
  
  instance.interceptors.response.use(null, error => {
      const expectedError = 
      error.response && 
      error.response.status >= 400 && 
      error.response.status < 500;
  
  
      if (!expectedError) {
          logger.log(error);
          // toast.error("An unexpected error occurred");
      }
  
      return Promise.reject(error);
  });
  
  
  export default instance;
  