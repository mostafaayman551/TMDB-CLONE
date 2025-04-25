import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { RiMovieAiFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [search, setSearch] = useState(false);
  const [show, setShow] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const lastScrollY = useRef(window.scrollY);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query.trim()}`);
      setQuery("");
      setSearch(false);
    }
  };
  return (
    <header
      className={`w-full h-[60px] fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm ${
        show ? "translate-y-0" : "-translate-y-full"
      } transition-all duration-300`}
    >
      <div className="mx-auto w-full h-full px-4 sm:px-10 flex justify-between items-center">
        {/* logo */}
        <div>
          <Link to={`/`} className="flex items-center gap-2">
            <RiMovieAiFill size={30} className="text-purple-500" />
            <span className="text-4xl font-bold text-purple-500">movie</span>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex gap-10">
          {/* nav links */}
          <Link to={`/explore/movie`} className="text-white hover:text-purple-500">
            Movies
          </Link>
          <Link to={`/explore/tv`} className="text-white hover:text-purple-500">
            TV Shows
          </Link>
          {/* search button */}
          <button
            className="text-white hover:text-purple-500"
            onClick={() => setSearch(true)}
          >
            <FaSearch size={18} />
          </button>
        </nav>
      </div>
      {/* search input */}
      <form
        className={`absolute w-full left-0 bg-white p-4 ${
          search ? "top-[60px]" : "top-[-60px]"
        } transition-all duration-300`}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="w-full px-20 focus:outline-none border-none text-xl"
          placeholder="Search movie App"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaX
          size={18}
          className="absolute top-1/2 right-20 -translate-y-1/2 hover:text-purple-500 cursor-pointer"
          onClick={() => setSearch(false)}
        />
      </form>
    </header>
  );
};

export default Header;
