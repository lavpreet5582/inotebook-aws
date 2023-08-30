import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Signup = (props) => {
  const { showAlert } = props;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const host = window.location.origin;

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/accounts/user/signup/`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.token) {
      //save the token and redirect
      localStorage.setItem("user", json.token);
      navigate("/");
      showAlert("Account Created Successfully", "success");
    } else {
      showAlert(json.error, "danger");
    }
    console.log(json);
  };
  const onchange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ marginTop: "4rem" }}>
      <div className="text-center">
        <h2 className="text center">Create an Account to Use INotebook</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            onChange={onchange}
            required
            minLength={1}
          />
          <div id="Help" className="form-text">
            Please Enter your full name.
          </div>
        </div>
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
            onChange={onchange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onchange}
            name="password"
            required
            minLength={8}
          />
          <span className="mx-2">Already Have a Account. Login Here.</span>
          <Link to="/login">Login</Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};
