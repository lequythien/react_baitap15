import BookShow from "./BookShow";
import "./bookList.css";
import { useContext } from "react";
import BookContext from "../context/book";

const BookList = () => {
    const { books } = useContext(BookContext);
    return (
        <div className="book-list">
            {books.map(book => (<BookShow book={book} />))}
        </div>
    );
};

export default BookList;