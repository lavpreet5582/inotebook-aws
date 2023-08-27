import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/noteContext'

export const AddNotes = (props) => {
  const {showAlert} = props;
  const {addNote} = useContext(NoteContext)
  const [note, setNote] = useState({title:"", description:"", tag:""})
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({title:"", description:"", tag:""})
    showAlert("Note Added Successfully", "success")
  }

  const onchange = (e) =>{
    setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <div>
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label" id='title'>
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onchange}
              name='title'
              value={note.title}
              minLength={10}
              required
            />
            {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" id='description'>
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputDescription"
              onChange={onchange}
              name='description'
              value={note.description}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" id='tag'>
              Tag
            </label>
            <select className="form-select" aria-label="Default select example" value={note.tag} onChange={onchange} name='tag' required>
              <option value="">Select Tag</option>
              <option value="general">General</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
            </select>
          </div>
          <button disabled={note.title.length < 5 || note.description < 10 || note.tag.length < 1} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
    </div>
  )
}
