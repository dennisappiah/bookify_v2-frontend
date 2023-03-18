import React, {useContext} from 'react'
import { BookContext } from '../context/BookContext';
import { CategoryContext } from '../context/CategoryContext';
import Book from "../components/Book"
import Category from "../components/Category"
// import Pagination component
import Pagination from '../components/Pagination';
// import Paginate function to paginate books array
import { Paginate } from '../utils/paginate';
//import lodash
import _ from 'lodash-es'
//import link
import { Link } from 'react-router-dom';
//import SelectBox
import SelectBox from '../components/common/SelectBox';

interface HomeProps {
  user: any
}

const Home = ({user}: HomeProps) => {
  //get books from BookContext
  const {
    books , 
    searchQuery,
    pageSize, 
    currentPage, 
    likeBook,
    handleBookDelete,
    changePage,
    currentFilter,
    filterByCategory,
    handleSortByColumn,
    sortColumn,
    handleSearch
    } = useContext(BookContext);

  //get categories from categoryContext
  const {categories} = useContext(CategoryContext);
  const {length: count} = books;

  if (count === 0) return (<p>There are no books books in the database</p>);

  //Filtering -> Sorting -> Paginating (books)

  //Filtering books
  let filteredBooks = books;
  if (searchQuery) {
    filteredBooks = books.filter(b => b.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
  } else {
    filteredBooks = currentFilter && currentFilter._id ? 
    books.filter((book) => book.category._id === currentFilter._id) : books;
  }
  
  //sorting books
  const sortedBooks = _.orderBy(filteredBooks, [sortColumn.column], [sortColumn.order])

  //paginate books
  const paginatedBooks = Paginate(sortedBooks, currentPage, pageSize);

  //renderSortIcon
  const renderSortIcon = (column: string) => {
    if (column !== sortColumn.column) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  }
  
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'> 
          <ul className="list-group mt-4">
            {categories.map(category => {
                return (
                  <Category category={category} key={category._id} 
                    onFilterSelect = {filterByCategory}  
                    currentFilter={currentFilter}
                  />
                  )
              })}
          </ul>
        </div>
        <div className='col mt-4'>
          {/* if authenticated , display Add Book element */}
          {
          user && <Link  
          to={`/books/new`} 
          className="btn btn-primary" style={{ marginBottom: 10}}>
          Add Book
         </Link>
        }
        <p>Showing {filteredBooks.length} books in the database</p>
        <SelectBox value={searchQuery} onChange={handleSearch} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col" onClick={()=> handleSortByColumn("title")}>
                Title {renderSortIcon("title")}
              </th>
              <th scope="col" onClick={()=> handleSortByColumn("category.name")} >
                Category {renderSortIcon('category.name')}
              </th>
              <th scope="col" onClick={()=> handleSortByColumn("numberInStock")}>
                Stock {renderSortIcon("numberInStock")}
              </th>
              <th scope="col" onClick={() => handleSortByColumn("dailyRentalRate")}>
                Rate {renderSortIcon("dailyRentalRate")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedBooks.map(book => {
              return (
                <Book book={book} key={book._id} onLike={likeBook} onRemove={handleBookDelete}/>
              )
            } )}
          </tbody>
         </table>
         <Pagination itemsCount={filteredBooks.length} pageSize={pageSize} currentPage={currentPage} 
         onPageChange = {changePage}
          />
      </div>
      </div>
    </div>
    
  )
}

export default Home