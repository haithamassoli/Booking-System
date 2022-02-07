import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Booking from "./components/Booking";
import ThankYou from "./components/ThankYou";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import SellerDashboard from "./components/SellerDashboard";
import Error from "./components/Error";
function App() {
  // get user if any
  const [loginStatus, setLoginStatus] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user.email);
      }
    });
  }, []);
  return (
    <div className="App">
      <Navbar loginStatus={loginStatus} />
      <Routes>
        <Route
          path="/"
          element={<Home setLoginStatus={setLoginStatus} />}
        ></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/success" element={<ThankYou />}></Route>
        <Route
          path="/login"
          element={<Login setLoginStatus={setLoginStatus} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup setLoginStatus={setLoginStatus} />}
        ></Route>
        <Route path="/seller-dashboard" element={<SellerDashboard />}></Route>
        <Route
          path="/logout"
          element={<Logout setLoginStatus={setLoginStatus} />}
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
