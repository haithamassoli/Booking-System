import React from "react";

function Signup() {
  return (
    <>
      <h1>Sign Up</h1>
      <form action="http://localhost:3001/signup" method="POST">
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default Signup;
