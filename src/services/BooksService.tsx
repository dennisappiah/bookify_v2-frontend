import {Book} from "../models/Book";
import axiosInstance from './axiosInstance';

export const getBooks = async() => {
    const response = await axiosInstance.get<Book[]>('/books');
    return response.data
  };

export const getBook = async(id:string) => {
   const response = await axiosInstance.get('/books' + '/' + id);
   return response.data;
}

//save book object
export const saveBook = async(book: any) => {
    if (book._id){
        const body = {...book}
        delete body._id;
        const response = await axiosInstance.put(`/books/${book._id}`, body);
        return response.data;
    }
    //for new book
    try {
        const response = await axiosInstance.post('/books' , book);
        return response.data;
    } catch (error ) {
        throw error;
    }
}


export const deleteBook = async(_id:string)  => {

    const response = await axiosInstance.delete(`/books/${_id}`);
    return response.data
}