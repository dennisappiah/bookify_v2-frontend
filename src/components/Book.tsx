import React, { useContext } from "react";
//importing book model
import { Book as BookModel } from "../models/Book";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/AuthService";

////What kind of data properties does this component need from the parent component?
interface BookProps {
  book: any;
  onLike: (_id: number) => void;
  onRemove: (_id: string) => void;
}

const Book = ({ book, onLike, onRemove }: BookProps) => {
  const { _id, title, category, numberInStock, dailyRentalRate, liked } = book;
  const user: any = getCurrentUser();

  // if (user & user.admin) {
  // }

  const isUserDelete = () => {
    if (user) {
      return (
        <td>
          <button
            onClick={() => onRemove(_id)}
            type="button"
            className="btn btn-danger btn-sm mx-2"
          >
            Delete
          </button>
        </td>
      );
    }
  };
  return (
    <tr>
      <td>
        <Link to={`/books/${book._id}`} style={{ textDecoration: "none" }}>
          {title}
        </Link>
      </td>
      <td>{category.name}</td>
      <td>{numberInStock}</td>
      <td>{dailyRentalRate}</td>
      <td>
        <i
          onClick={() => onLike(_id)}
          className={`${
            !liked ? "fa fa-heart-o" : "fa fa-heart"
          } aria-hidden="true"`}
        ></i>
      </td>
      {isUserDelete()}
    </tr>
  );
};

export default Book;
