import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="text-center min-h-screen pt-20 bg-blue-950 flex flex-col justify-center items-center">
      <p className="text-2xl text-white">
        <span className="text-red-600">404</span> | Oops! Page not found
      </p>
        <Link to={"/"} className="text-white flex items-center gap-2 mt-5 BTH border border-purple-500 p-4 rounded-md animate-bounce transition-all duration-300 hover:animate-none">
        Back To Home <FaLongArrowAltRight size={20} />
        </Link>
    </section>
  );
};

export default NotFound;
