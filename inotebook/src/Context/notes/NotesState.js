import { useState } from "react";
import NoteContext from "./noteContext";

const NotesState = (props) => {
  const host = window.location.origin + '/api';
  console.log(host);
  const [notes, setNotes] = useState([]);
  const user = localStorage.getItem('user')
  const token ="Bearer " +  user

  const getAllNotes = async () => {
    const url = `${host}/notes/`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note
  const addNote = async (note) => {
    const url = `${host}/notes/`;
    console.log("add note functin called with note data", note);
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(note), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/notes/${id}/`;
    console.log("Edit functin called with id and note data", id, {
      title,
      description,
      tag,
    });
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i].id === id) {
        newNotes[i].title = json.title;
        newNotes[i].description = json.description;
        newNotes[i].tag = json.tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //Delete a Note
  const deleteNote = async (note_id) => {
    const url = `${host}/notes/${note_id}/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });
    const json = await response.json();
    console.log(json.message, note_id);
    const newNotes = notes.filter((note) => {
      return note.id !== note_id;
    });

    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesState;
