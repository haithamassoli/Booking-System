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
      <h1 className="text-3xl text-center mt-4">Login</h1>
      <form className="md:mx-auto max-w-2xl mx-6" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Your Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
            type="email"
            name="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-black dark:text-black"
          >
            Your Password
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
            type="password"
            name="password"
            placeholder="Password"
            value={formValue.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
