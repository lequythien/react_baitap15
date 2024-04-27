import { createContext } from "react";
import { fetchBooks, createBook, updateBook, deleteBook } from "../api";
import { useState, useEffect } from "react";

const BookContext = createContext();

const Provider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = async (id) => {
        const book = await deleteBook(id);
        console.log(book);
        setBooks(books.filter((item) => item.id !== book.id));
    }

    const handleCreate = async (term) => {
        const book = await createBook(term);
        if (book) setBooks([...books, book]);
    };

    const handleUpdate = async (id, term) => {
        console.log({ id, term });
        const book = await updateBook(id, term);
        setBooks(
            books.map((item) => item.id === book.id ? book : item)
        );
    };

    const getAllBooks = async () => {
        const tams = await fetchBooks();
        setBooks(tams);
    }

    const fetchData = async (setBooks) => {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
    };

    useEffect(() => {
        fetchData(setBooks);
    }, [currentPage]);

    const valueShare = {
        onEdit: handleUpdate,
        onDelete: handleDelete,
        onCreate: handleCreate,
        getAllBooks,
        currentPage,
        setCurrentPage,
        books,
    };

    return (
        <BookContext.Provider value={valueShare}>{children}</BookContext.Provider>
    );
};

export { Provider };
export default BookContext;