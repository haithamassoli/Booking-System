import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="p-8 bg-red-700 flex justify-between items-center">
      <NavLink to={"/"} className="cursor-pointer text-[2rem] text-white">
        BurgerMaker
      </NavLink>
      <div>
        <NavLink to={"/login"} className="cursor-pointer text-xl text-white">
          login
        </NavLink>
        <NavLink to={"/signup"} className="cursor-pointer text-xl text-white">
          SignUp
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
