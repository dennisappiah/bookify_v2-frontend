import {Book} from "../models/Book";
import axiosInstance from './axiosInstance';


export const getBooks = async() => {
    const response = await axiosInstance.get<Book[]>('/books');
    return response.data
  };

export const addBooks = 
    async(title: string, category: {_id:string}, numberInStock: number, dailyRentalRate:number) =>
    {
    try {
        const response = await axiosInstance.post<Book>('/books' , 
        {title, category, numberInStock, dailyRentalRate});
        return response.data;
    } catch (error ) {
        throw error;
    }
}

export const removeBook = async(_id:string)  => {

    const response = await axiosInstance.delete(`/books/${_id}`);
    return response.data
}