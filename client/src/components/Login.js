import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const [error, setError] = useState(false);
  const [formValue, setformValue] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // check empty value
    if (formValue.email !== "" && formValue.password !== "") {
      setError(false);
      // make axios post request
      axios
        .post("http://localhost:3001/login", {
          email: formValue.email,
          password: formValue.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setError(true);
    }
  };
  useEffect(() => {});
  return (
    <>
      {error ? "It shouldn't be empty" : ""}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValue.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
