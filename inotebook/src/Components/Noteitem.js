import React, { useContext } from "react";
import NoteContext from "../Context/notes/noteContext";

export const Noteitem = (props) => {
  const { note, updateNote, showAlert } = props;
  const { deleteNote } = useContext(NoteContext);
  const handleDelete = () => {
    deleteNote(note.id);
    showAlert("Deleted Successfully", "success")
  };
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title my-1">{note.title}</h5>
            <div className="icons">
              <i
                className="fa-sharp fa-solid fa-trash mx-3"
                onClick={handleDelete}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-3"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text my-2">{note.description}</p>
        </div>
      </div>
    </div>
  );
};
