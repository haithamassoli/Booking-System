import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout({ setLoginStatus }) {
  let navigate = useNavigate();
  useEffect(() => {
    setLoginStatus(false);
    navigate("/");
  }, []);
  return <div></div>;
}

export default Logout;
