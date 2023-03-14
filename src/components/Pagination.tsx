import React from 'react'
import _ from 'lodash-es'

//What kind of data properties does this component need from the parent component?
interface paginationProps{
    itemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (page:number) => void
}

const Pagination = ({itemsCount, pageSize, currentPage , onPageChange}: paginationProps) => {
  //[1...pagesCount].map()
  const pagesCount = Math.ceil(itemsCount / pageSize); 
  if (pagesCount === 1) return null;
  //    [1, 2..pagesCount].map returns pages array
  const pages = _.range(1, pagesCount+ 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return ( 
            <li key={page} className={`${page === currentPage ? 'page-item active': 'page-item'}`}>
              <a onClick={() => onPageChange(page)} className="page-link">{page}</a>
            </li>
            )
        })}
       
      </ul>
   </nav>
  )
}

export default Pagination