import * as categoryAPI from "./faksCategoryServices";

const books = [
    {
        _id: "5b21ca3eeb767fhccd471815",
        title : "Terminator",
        category : {_id:"5b21ca3eeb767fhccd471818", name: "Action" },
        numberInStock: 5,
        dailyRentalRate : 2.5,
        liked: true
    }, 
    {
        _id: "5b21ca3eeb767fhccd471816",
        title : "Avatar",
        category : {_id:"5b21ca3eeb767fhccd471818", name: "Action" },
        numberInStock: 6,
        dailyRentalRate : 10
    },
    {
        _id: "5b21ca3eeb767fhccd471817",
        title : "Woman Steel",
        category : {_id:"5b21ca3eeb767fhccd471819", name: "Romance" },
        numberInStock: 7,
        dailyRentalRate : 15
    },
    {
        _id: "5b21ca3eeb767fhccd471818",
        title : "Selfish Love",
        category : {_id:"5b21ca3eeb767fhccd471819", name: "Romance" },
        numberInStock: 8,
        dailyRentalRate : 16
    },
    {
        _id: "5b21ca3eeb767fhccd471819",
        title : "Televista",
        category : {_id:"5b21ca3eeb767fhccd471820", name: "Adventure" },
        numberInStock: 9,
        dailyRentalRate : 17
    },
    {
        _id: "5b21ca3eeb767fhccd471820",
        title : "Hello World",
        category : {_id:"5b21ca3eeb767fhccd471820", name: "Adventure" },
        numberInStock: 15,
        dailyRentalRate : 20
    },
    {
        _id: "5b21ca3eeb767fhccd471821",
        title : "World Season",
        category : {_id:"5b21ca3eeb767fhccd471821", name: "Thriller" },
        numberInStock: 15,
        dailyRentalRate : 20
    },
    {
        _id: "5b21ca3eeb767fhccd471822",
        title : "Amazon",
        category : {_id:"5b21ca3eeb767fhccd471822", name: "Comedy" },
        numberInStock: 15,
        dailyRentalRate : 20
    },
    {
        _id: "5b21ca3eeb767fhccd471823",
        title : "Amazon Crashers",
        category : {_id:"5b21ca3eeb767fhccd471822", name: "Comedy" },
        numberInStock: 15,
        dailyRentalRate : 20
    },

]

export const getbooks = () => {
    return books;
}


//get book by id
export const getBook = (id:string) => {
    return books.find(book => book._id === id);
}

//save book object
export const saveBook = (book: any) => {
  let bookInDb: any = books.find(m => m._id === book._id) || {};
  bookInDb.title = book.title;
  bookInDb.category = categoryAPI.category.find(g => g._id === book.categoryId);
  bookInDb.numberInStock = book.numberInStock;
  bookInDb.dailyRentalRate = book.dailyRentalRate;

  if (!bookInDb._id) {
    bookInDb._id = Date.now().toString();
    books.push(bookInDb);
  }

  return bookInDb as {
    title: string,
    category: string,
    numberInStock: number,
    dailyRentalRate: number
  };
}

export const deleteBook = (id: string) => {
    let bookInDb = books.find(m => m._id === id);
    if (bookInDb)
    books.splice(books.indexOf(bookInDb), 1);
    return bookInDb;
}
  
  