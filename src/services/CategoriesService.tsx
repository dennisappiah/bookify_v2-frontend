import {Category} from '../models/Category';
import axiosInstance from './axiosInstance';


export const getCategory = async() => {
    const response = await axiosInstance.get<Category[]>('/categories');
    return response.data
  };