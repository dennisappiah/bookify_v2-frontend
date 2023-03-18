import { Login } from '../models/Auth';
import axiosInstance from './axiosInstance';
import jwtDecode from 'jwt-decode'


export const loginUser = async(email: string, password:string) => {
    try {
        const response = await axiosInstance.post<Login>('/auth' , {email, password});
        return response
    }
    catch (error) {
            throw error;
    }
}

// get token from localstorage
export const getToken = () => {
    const token = localStorage.getItem("token");
    if (token && typeof token === "string") {
      return JSON.parse(token);
    }
    return null;
  };
  
export const getAuthorizationHeader = () => ` ${getToken()}`;

// store jwt in local storage in the browser
export const storeToken = (jwt: string) => {
    localStorage.setItem('token', JSON.stringify(jwt));
}

// logout user
export const logOut = () => {
    localStorage.removeItem("token");
}


export const getCurrentUser = () => {
  try {
      const jwt = localStorage.getItem("token");
      if (jwt && typeof jwt === "string") {
        const parsed = JSON.parse(jwt);
        return jwtDecode(parsed);
      }
    } catch (ex) {
      return null;
    }
}