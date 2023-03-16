import React, {createContext, useState, useEffect} from 'react'
import {Book} from '../models/Book'
// import getBook from Bookservice
import {getbooks} from "./../services/FakeServices/fakeBooksService"
import BooksFormSchema from '../schemas/booksSchema';

interface IBookContext{
  books: Book[];
  removeBook: (_id:string) => void;
  likeBook: (_id:string) => void;
  changePage: (page:number) => void
  filterByCategory: (category: {_id: string , name: string }) => void
  handleSortByColumn: (newColumn: string) => void
  handleSearch: (e:React.ChangeEvent<HTMLInputElement>) => void
  currentPage : number;
  pageSize : number;
  searchQuery: string;
  sortColumn: {column: string, order: any}
  currentFilter : { _id: string, name: string };
  data: {
    title: string,
    categoryId: string,
    numberInStock: number,
    dailyRentalRate: number
  },
  errors: {
    title: string,
    categoryId: string,
    numberInStock: string,
    dailyRentalRate: string
  },
  handleSelectChange : (e: React.ChangeEvent<HTMLSelectElement>) => void,
  handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
  validateProperty: (field: string) => void
  submitted: boolean
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
  handleSearch: () => {},
  currentPage: 1,
  pageSize: 4,
  searchQuery: "",
  sortColumn: {column: "title", order: "asc" 
  },
  currentFilter: {_id: "", name: "" },
  data: {
    title: "",
    categoryId: "",
    numberInStock: 0,
    dailyRentalRate: 0
  },
  errors: {
    title: "",
    categoryId: "",
    numberInStock: "",
    dailyRentalRate: ""
  },
  handleSelectChange: () => {},
  handleChange: () => {},
  validateProperty: () => {},
  submitted: false
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

  //data state
  const [data, setData] = useState({
    title: "",
    categoryId: "",
    numberInStock: 0,
    dailyRentalRate: 0
  });
  
  //errors state
  const [errors, setErrors] = useState({
    title: "",
    categoryId: "",
    numberInStock: "",
    dailyRentalRate: ""
  });

  //submitted state
  const [submitted, setSubmitted] = useState(false);

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

  //validating Form after submission
  const validateForm = async (): Promise<boolean> => {
    try {
      await BooksFormSchema.validate(data, { abortEarly: false });
      setErrors({title: "", categoryId: "", numberInStock: "", dailyRentalRate: ""});
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
      await BooksFormSchema.validateAt(field, data);
      setErrors(errors => ({ ...errors, [field]: "" }));
    } catch (err: any) {
      setErrors(errors => ({ ...errors, [field]: err.message }));
    }
  };

  //handlechange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const newValue = (name === "numberInStock" || name== "dailyRentalRate") ? parseInt(value) || 0 : value;
    setData((prevData) => ({ ...prevData, [name]: newValue }));
    validateProperty(name);
  };

  //HandleCategorySelect Change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(data => {
      console.log(`Previous state: ${JSON.stringify(data)}`);
      const newState = { ...data, [name]: value };
      console.log(`New state: ${JSON.stringify(newState)}`);
      return newState;
    });
    validateProperty(name);
  };
  

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [data, submitted]);

  
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
      handleSortByColumn,
      handleSearch,
      data,
      errors,
      handleSelectChange,
      handleChange,
      validateProperty,
      submitted
    }}>
      {children}
  </BookContext.Provider>
  )
}

export default BookProvider