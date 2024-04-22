import React, { createContext, useState } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook } from "../api";

const BookContext = createContext();
const UserContext = createContext(null);

const UserProvider = ({ children, books }) => { // Pass books as a prop
  const [users, setUsers] = useState([]);
  const [isLogin, setIsLogin] = useState([]);

  const handleDelete = async (id) => {
    const book = await deleteBook(id);
    console.log(book);

    // Access books from props and update it
    setBooks(books.filter((item) => item.id !== book.id));
  };

  const handleCreate = async (term) => {
    const book = await createBook(term);
    if (book) setBooks([...books, book]);
  };

  const handleUpdate = async (id, term) => {
    console.log({ id, term });
    const book = await updateBook(id, term);
    setBooks(
      books.map((item) => (item.id === book.id ? book : item))
    );
  };

  const getAllBooks = async () => {
    const tams = await fetchBooks();
    setBooks(tams);
  };

  const valueShare = {
    onEdit: handleUpdate,
    onDelete: handleDelete,
    onCreate: handleCreate,
    getAllBooks,
    books,
    isLogin,
  };

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
export default BookContext;
