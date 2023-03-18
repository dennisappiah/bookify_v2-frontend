import React, {createContext, useState, useEffect} from 'react'
import {Book} from '../models/Book'
// import getBook from Bookservice
import {getbooks} from "./../services/FakeServices/fakeBooksService"
import { getBooks , deleteBook } from '../services/BooksService';
import BooksFormSchema from '../schemas/booksSchema';
import { toast } from 'react-toastify';

interface IBookContext{
  books: Book[];
  handleBookDelete: (_id:string) => void;
  likeBook: (_id:string) => void;
  changePage: (page:number) => void
  filterByCategory: (category: {_id: string , name: string }) => void
  handleSortByColumn: (newColumn: string) => void
  handleSearch: (e:React.ChangeEvent<HTMLInputElement>) => void
  currentPage : number;
  pageSize : number;
  searchQuery: string;
  sortColumn: {column: string, order: any}
  currentFilter : { _id: string, name: string }
 }

type BookProviderProps = {
  children: React.ReactNode
}

//create context 
export const BookContext = createContext<IBookContext>({
  books: [],
  handleBookDelete: () => {},
  likeBook: () => {},
  changePage: () => {},
  filterByCategory: () => {},
  handleSortByColumn: () => {},
  handleSearch: () => {},
  currentPage: 1,
  pageSize: 4,
  searchQuery: "",
  sortColumn: {column: "title", order: "asc" 
  },
  currentFilter: {_id: "", name: "" },
});

export const BookProvider = ({children}: BookProviderProps) => {
  //books state
  const [books, setBooks] = useState<Book[]>([]);
  //current page state
  const [currentPage, setCurrentPage] = useState(1);
  //page size state
  const [pageSize, setPageSize] = useState(4);
  //search query state
  const [searchQuery, setSearchQuery] = useState("");
  //sortcolumn state
  const [sortColumn, setSortColumn] = useState({
    column: "title",
    order: "asc"
  });

  //current Filter state
  const [currentFilter, setCurrentFilter] = useState({ _id: "", name: ""});

  
  //delete book
  const handleBookDelete = async(_id: string) => {
    //updating ui first before server call
    const originalBooks = books;
    const newBooks = originalBooks.filter((book) => {
      return book._id !== _id;
    });
    setBooks(newBooks);
    try {
      await deleteBook(_id);
    } catch (ex: any) {
      if (ex.response && ex.response === 404){
        toast.error("This book has already been deleted");
        setBooks(originalBooks);
      }
    }
  };

  //like book
  const likeBook = (_id:string) => {
    const likedBooks = books.map(book => {
      if (book._id === _id) {
        return {...book, liked: !book.liked}
      }
      return book;
    });
    setBooks(likedBooks);
  };

  //ChangePage
  const changePage = (page:number) => {
    setCurrentPage(page);
  };

  //Change to NextPage
  const NextPage = (page:number) => {
    setCurrentPage(page + 1);
  };

  //Filter books by category 
  const filterByCategory = (category: {_id: string, name: string}) => { 
    setCurrentFilter(category);
    setSearchQuery("");
    setCurrentPage(1);
  };

  //sort BooksTable by column
  const handleSortByColumn = (newColumn: string) => {
    const newSortColumn = {...sortColumn};
    if (newSortColumn.column === newColumn) 
        newSortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc'; 
      else {
        newSortColumn.column = newColumn;
        newSortColumn.order = 'asc'
      }
      setSortColumn(newSortColumn);
  }

  //handle Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    // currentFilter: "", currentPage: 1
    setSearchQuery(value);
    setCurrentFilter({_id: "", name: ""});
    setCurrentPage(1);
  }
  
  //fetch books to update the state
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);
  return (
    <BookContext.Provider value={{
      books, 
      handleBookDelete, 
      likeBook,
      changePage,
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
      currentFilter,
      filterByCategory,
      handleSortByColumn,
      handleSearch
    }}>
      {children}
  </BookContext.Provider>
  )
}

export default BookProvider