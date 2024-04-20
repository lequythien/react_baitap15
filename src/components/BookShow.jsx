import BookEdit from "./BookEdit";
import { useContext, useState } from "react";
import BookContext from "../context/book";

const BookShow = ({ book }) => {
    const { count, incrementCount, onEdit, onDelete } = useContext(BookContext);
    const image = `http://picsum.photos/seed/${book.id}/200/300`;
    const [isEdit, setIsEdit] = useState(false);
    const handleEdit = (id, term) => {
        onEdit(id, term);
        setIsEdit(false);
    };

    return (
        <div className='item'>
            {count}
            <button onClick={incrementCount}>Thêm</button>
            <div className='image'>
                <img src={image} alt="" />
            </div>
            {!isEdit && (
                <>
                    <h2>{book.title}</h2>
                    <p>{book.des}</p>
                </>
            )}
            {isEdit && <BookEdit book={book} onEdit={handleEdit} />}
            {!isEdit && (
                <>
                    <button className="button1" onClick={() => onDelete(book.id)}>DELETE</button>
                    <button className="button1" onClick={() => setIsEdit(!isEdit)}>EDIT</button>
                </>
            )}
        </div>
    );
};

export default BookShow;