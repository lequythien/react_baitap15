import { useState, useContext } from "react";
import "./bookcreate.css";
import BookContext from "../context/book";

const BookCreate = () => {
  const [title, setTitle] = useState("title");
  const [des, setDes] = useState("Description");
  const { onCreate } = useContext(BookContext);
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDes = (e) => {
    setDes(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reps = onCreate({
      title,
      des,
    });
  };

  return (
    <div className="form-create">
      <h3>Add a Book</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-input1" onChange={handleChangeTitle} type="text" id="title" name="title" placeholder="Nhập tiêu đề của bạn..." />
        <input className="form-input1" onChange={handleChangeDes} type="text" id="des" name="des" placeholder="Nhập miêu tả của bạn..." />
        <p><input className="form-input2" type="submit" value="Create!" /></p>
      </form>
    </div>
  )
}

export default BookCreate;