import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-950 pt-14">
      <div className="bg-black/50 flex flex-col items-center py-10 px-4 sm:px-10 text-center">
        <ul className="flex items-center gap-5 mb-5 text-sm">
          <li>
            <Link to={void(0)} className="text-white hover:text-purple-500">
              Terms Of Use
            </Link>
          </li>
          <li>
            <Link to={void(0)} className="text-white hover:text-purple-500">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to={void(0)} className="text-white hover:text-purple-500">
              About
            </Link>
          </li>
          <li>
            <Link to={void(0)} className="text-white hover:text-purple-500">
              Blog
            </Link>
          </li>
          <li>
            <Link to={void(0)} className="text-white hover:text-purple-500">
              FAQ
            </Link>
          </li>
        </ul>
        <p className="text-gray-500 text-sm font-light mb-5">
          This site utilizes the TMDB API to bring you a comprehensive database
          of movies and TV shows. All data and resources are sourced directly
          from TMDB. Thank you to TMDB for providing this incredible resource.
          <br />
          made with ❤️ by mostafa ayman
        </p>
        <ul className="flex items-center gap-5">
          <li className="flex items-center justify-center bg-blue-950 p-3 rounded-full group hover:shadow-[0_0_10px] hover:shadow-purple-500">
            <FaFacebookF
              size={20}
              className="text-white cursor-pointer group-hover:text-purple-500 group-hover:rotate-[360deg] transition-all duration-300"
            />
          </li>
          <li className="flex items-center justify-center bg-blue-950 p-3 rounded-full group hover:shadow-[0_0_10px] hover:shadow-purple-500">
            <FaInstagram
              size={20}
              className="text-white cursor-pointer group-hover:text-purple-500 group-hover:rotate-[360deg] transition-all duration-300"
            />
          </li>
          <li className="flex items-center justify-center bg-blue-950 p-3 rounded-full group hover:shadow-[0_0_10px] hover:shadow-purple-500">
            <FaTwitter
              size={20}
              className="text-white cursor-pointer group-hover:text-purple-500 group-hover:rotate-[360deg] transition-all duration-300"
            />
          </li>
          <li className="flex items-center justify-center bg-blue-950 p-3 rounded-full group hover:shadow-[0_0_10px] hover:shadow-purple-500">
            <FaLinkedinIn
              size={20}
              className="text-white cursor-pointer group-hover:text-purple-500 group-hover:rotate-[360deg] transition-all duration-300"
            />
          </li>
          <li className="flex items-center justify-center bg-blue-950 p-3 rounded-full group hover:shadow-[0_0_10px] hover:shadow-purple-500">
            <Link to={"https://github.com/mostafaayman551"} target="_blank">
              <FaGithub
                size={20}
                className="text-white cursor-pointer group-hover:text-purple-500 group-hover:rotate-[360deg] transition-all duration-300"
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
