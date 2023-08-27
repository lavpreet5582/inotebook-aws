import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { AbountUs } from "./Components/AbountUs";
import NotesState from "./Context/notes/NotesState";
import { Alert } from "./Components/Alert";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            </Routes>
            <Routes>
              <Route exact path="/about" element={<AbountUs />} />
            </Routes>
            <Routes>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            </Routes>
            <Routes>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
