import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-slate-800 text-center py-4">
      <p className="text-white text-xl">
        Copyright © 2024 - All right reserved by{" "}
        <Link
          to="https://www.instagram.com/mosinov.o1/"
          className="text-blue-400"
        >
          Akbarjon Mo'sinov
        </Link>
      </p>
    </div>
  );
}

export default Footer;
