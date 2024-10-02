import React from "react";
import { Link, NavLink } from "react-router-dom";
// IMG
import Logout from "../img/logout.svg";
import "../App.css";
function Header() {
  return (
    <div className="bg-slate-800 ">
      <div className="my-container flex justify-between items-center">
        <div className="logo">
          <Link className=" text-white text-3xl  font-bold font-sans" to="/">
            USER
          </Link>
        </div>
        <nav className="flex gap-5">
          <NavLink to="/" className="text-white text-md hover:text-slate-300">
            Home
          </NavLink>
        </nav>
        <Link
          to="/login"
          className="flex gap-3 rounded-xl py-2 px-2 bg-cyan-500"
        >
          <p className="text-white text-md">Lo gout</p>{" "}
          <img src={Logout} alt="" width={20} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
