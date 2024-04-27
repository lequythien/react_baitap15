import BookShow from "./BookShow";
import "./bookList.css";
import { useContext, useState } from "react";
import BookContext from "../context/book";

const BookList = () => {
  const { books, currentPage, setCurrentPage } = useContext(BookContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [booksPerPage, setBooksPerPage] = useState(10); // Số sách hiển thị trên 1 trang

  // Chức năng xử lý thay đổi cụm từ tìm kiếm
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Chuẩn hóa thành chữ thường
  };

  // chức năng xử lý thay đổi trang (tiếp xúc với BookContext)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Lọc sách dựa trên cụm từ tìm kiếm (không phân biệt chữ hoa chữ thường)
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính tổng số trang (xem xét sách đã lọc)
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Tính toán chỉ số bắt đầu và kết thúc cho sách được hiển thị
  const indexOfLastBook = Math.min(currentPage * booksPerPage, filteredBooks.length);
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="book-list">
      {/* Search input */}
      <input
        className="search-input"
        type="text"
        placeholder="Bạn muốn tìm kiếm..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div>
        <label htmlFor="booksPerPage">Số sách muốn hiển thị: </label>
        <select id="booksPerPage" value={booksPerPage} onChange={(e) => setBooksPerPage(parseInt(e.target.value))}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>

      {/* Hiển thị sách hiện tại dựa trên phân trang và lọc */}
      {currentBooks.map((book) => (
        <BookShow key={book.id} book={book} />
      ))}

      {/* Giao diện người dùng phân trang */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Trước
        </button>

        {totalPages > 1 && (
          <ul>
            {Array.from({ length: totalPages }).map((_, i) => (
              <li key={i + 1} className={currentPage === i + 1 ? "active" : ""}>
                <button onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
              </li>
            ))}
          </ul>
        )}

        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Sau
        </button>

        <span className="current-page">Trang {currentPage} / {totalPages}</span>
      </div>
    </div>
  );
};

export default BookList;
