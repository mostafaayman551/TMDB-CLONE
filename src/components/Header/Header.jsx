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
      className={`w-full h-[60px] fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md ${
        show ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300`}
    >
      <div className="mx-auto w-full h-full px-4 sm:px-10 flex justify-between items-center">
        {/* logo */}
        <div>
          <Link to={`/`} className="flex items-center gap-2">
            <RiMovieAiFill size={30} className="text-purple-500" />
            <span className="text-3xl font-bold text-purple-500">movie</span>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex gap-6">
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
        className={`absolute w-full top-0 h-[60px] flex items-center bg-white px-4 gap-4 transition-all duration-300 ${
          search ? "translate-y-[60px]" : "-translate-y-full"
        }`}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 focus:outline-none text-lg"
          placeholder="Search movie App"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="cursor-pointer text-purple-500 hover:text-purple-700">
          Search
        </button>
        <FaX
          size={18}
          className="text-black hover:text-purple-500 cursor-pointer"
          onClick={() => setSearch(false)}
        />
      </form>
    </header>
  );
};

export default Header;
