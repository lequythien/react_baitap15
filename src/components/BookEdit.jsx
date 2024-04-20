import { useState, useContext } from "react";
import "./bookedit.css";
import BookContext from "../context/book";

const BookEdit = ({ book, onEdit }) => {
    const [title, setTitle] = useState(book.title);
    const [des, setDes] = useState(book.des);
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeDes = (e) => {
        setDes(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        onEdit(book.id, {
            title,
            des,
        });
    };

    return (
        <div className="edit-input">
            <form onSubmit={handleSubmit}>
                <label htmlFor="">TITLE: </label>
                <input className="input1" onChange={handleChangeTitle} type="text" id="title" name="title" value={title} />
                <input className="input1" onChange={handleChangeDes} type="text" id="des" name="des" value={des} />
                <button className="input2">CANCEL</button>
                <input className="input2" type="submit" value="LƯU" />
            </form>
        </div>
    )
}

export default BookEdit;