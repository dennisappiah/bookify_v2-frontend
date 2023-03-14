import React, {createContext, useState, useEffect} from 'react'
import {Book} from '../models/Book'
// import getBook from Bookservice
import {getbooks} from "./../services/FakeServices/fakeBooksService"

interface IBookContext{
  books: Book[];
  removeBook: (_id:string) => void;
  likeBook: (_id:string) => void;
  changePage: (page:number) => void
  filterByCategory: (category: {_id: string , name: string }) => void
  handleSortByColumn: (newColumn: string) => void
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
  removeBook: () => {},
  likeBook: () => {},
  changePage: () => {},
  filterByCategory: () => {},
  handleSortByColumn: () => {},
  currentPage: 1,
  pageSize: 4,
  searchQuery: "",
  sortColumn: {
    column: "title", order: "asc" 
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
  const removeBook = (_id: string) => {
    const newBooks = books.filter((book) => {
      return book._id !== _id;
    });
    setBooks(newBooks);
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


  //fetch books to update the state
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getbooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);
  return (
    <BookContext.Provider value={{
      books, 
      removeBook, 
      likeBook,
      changePage,
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
      currentFilter,
      filterByCategory,
      handleSortByColumn
    }}>
      {children}
  </BookContext.Provider>
  )
}

export default BookProvider