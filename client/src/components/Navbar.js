import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ loginStatus }) {
  return (
    <div className="p-8 bg-pink-600 flex justify-between items-center">
      <NavLink to={"/"} className="cursor-pointer text-2xl text-white">
        <div className="flex items-center">
          <h3 className="sm:block hidden">DonutMaker</h3>
          <img
            src="https://clipart-best.com/img/donut/donut-clip-art-35.png"
            alt="donut"
            width={50}
          />
        </div>
      </NavLink>
      <div>
        {loginStatus == false ? (
          <>
            <NavLink
              to={"/login"}
              className="cursor-pointer text-xl text-white hover:text-pink-200"
            >
              Login
            </NavLink>
            <NavLink
              to={"/signup"}
              className="ml-4 cursor-pointer text-xl text-white hover:text-pink-200"
            >
              SignUp
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to={"/seller-dashboard"}
              className="cursor-pointer text-xl text-white hover:text-pink-200"
            >
              Dashboard
            </NavLink>
            <NavLink
              to={"/logout"}
              className="cursor-pointer ml-4 text-xl text-white hover:text-pink-200"
            >
              Logout
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
