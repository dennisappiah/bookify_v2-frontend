import React, {useContext} from 'react'
//importing book model
import {Book as BookModel}  from '../models/Book'
import {FcDeleteDatabase} from "react-icons/fc"

////What kind of data properties does this component need from the parent component?
interface BookProps{
    book: BookModel
    onLike : (_id: string) => void
    onRemove : (_id: string) => void
}

const Book = ({book, onLike, onRemove}: BookProps) => {
    const {_id, title, category, numberInStock, dailyRentalRate, liked } = book;
  
    return (
         <tr>
             <td>{title}</td>
             <td>{category.name}</td>
             <td>{numberInStock}</td>
             <td>{dailyRentalRate}</td>
             <td><i onClick={()=> onLike(_id)}  className={`${!liked? 'fa fa-heart-o': 'fa fa-heart'} aria-hidden="true"`}></i></td>
             <td><button onClick={() => onRemove(_id)} type="button" className="btn btn-danger btn-sm mx-2">Delete</button></td>
             {/* <td> <FcDeleteDatabase className='fs-3 fw-bold'  onClick={() => onRemove(_id)}/></td> */}
        </tr>
    )
}

export default Book