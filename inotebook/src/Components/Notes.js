import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/noteContext";
import { Noteitem } from "./Noteitem";
import { AddNotes } from "./AddNotes";
import { useNavigate } from "react-router-dom";

export const Notes = (props) => {
  const {showAlert} = props;
  const { notes, getAllNotes, editNote } = useContext(NoteContext);
  let navigate = useNavigate()
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if(localStorage.getItem('user')){

      getAllNotes();
    }else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Updated Successfully", "success")
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (note) => {
    ref.current.click();
    setNote({
      id: note.id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };

  const refClose = useRef(null);

  const ref = useRef(null);
  return (
    <>
      <AddNotes showAlert={showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label" id="etitle">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    name="etitle"
                    value={note.etitle}
                  />
                  {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="edescription"
                    className="form-label"
                    id="edescription"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputDescription"
                    onChange={onchange}
                    name="edescription"
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label" id="etag">
                    Tag
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={onchange}
                    name="etag"
                    value={note.etag}
                  >
                    <option value="">Select Tag</option>
                    <option value="general">General</option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
              disabled = {note.etitle.length < 5 || note.edescription.length < 10 ||note.etag.length < 1}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className="text-center">Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No Notes Available Right Now."}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note.id} updateNote={updateNote} note={note} showAlert={showAlert}/>
          );
        })}
      </div>
    </>
  );
};
