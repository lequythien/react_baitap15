import { createContext } from "react";
import { fetchBooks, createBook, updateBook, deleteBook } from "../api";
import { useState } from "react";

const BookContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLogin, setIsLogin] = useState([]);
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

    const valueShare = {
        onEdit: handleUpdate,
        onDelete: handleDelete,
        onCreate: handleCreate,
        getAllBooks,
        books,
        isLogin,
    };

    return (
        <BookContext.Provider value={valueShare}>{children}</BookContext.Provider>
    );
};

export { UserProvider };
export default BookContext;