import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = (props) => {
  const { showAlert } = props;
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  //   const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/accounts/user/login/`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();
    if (json.token) {
      //save the token and redirect
      localStorage.setItem("user", json.token);
      navigate("/");
      showAlert("Loggedin Successfully", "success");
    } else {
      showAlert(json.error, "danger");
    }
  };

  const onchange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  return (
    <div className="container" style={{ marginTop: "4rem" }}>
      <div className="text-center">
        <h2>Login to Use INotebook</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={creds.email}
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={creds.password}
            onChange={onchange}
            minLength={8}
          />
          <span className="mx-2">Dont Have Account. Signup Here.</span>
          <Link to="/signup">Signup</Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
