import React, { useEffect, useState } from "react";
import Trending from "../../components/HomeSections/Trending";
import TopRated from "../../components/HomeSections/TopRated";
import WhatIsPopular from "../../components/HomeSections/WhatIsPopular";
import { fetchBackdrop, fetchGenres, IMAGE_BASE_URL } from "../../utils/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [genres, setGenres] = useState([]);
  const [backdrop, setBackdrop] = useState([]);
  const [randomBackdrop, setRandomBackdrop] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres().then((data) => setGenres(data));
  }, []);
  useEffect(() => {
    fetchBackdrop().then((data) => setBackdrop(data));
  }, []);
  // update background image every 1 minute
  useEffect(() => {
    if (!backdrop.length) return;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * backdrop.length);
      setRandomBackdrop(backdrop[randomIndex]);
    }, 6e4);
    return () => clearInterval(interval);
  }, [backdrop]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query.trim()}`);
    }
  };
  return (
    <section className="w-full bg-blue-950">
        <motion.div
          className="pt-32 sm:pt-40 mx-auto text-center w-full min-h-[80vh] sm:min-h-screen relative flex flex-col justify-center items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="z-10 absolute top-0 left-0 w-full h-full">
            <img src={randomBackdrop ? IMAGE_BASE_URL + randomBackdrop : IMAGE_BASE_URL + backdrop[0]} alt="hero backdrop image"
            className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 z-10"></div>

          <motion.div
            className="px-6 sm:px-10 py-8 rounded-2xl relative z-30 inline-block mb-10 bg-opacity-20"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl text-white font-bold uppercase leading-tight">
              Welcome.
            </h1>
            <p className="text-lg sm:text-xl text-white font-medium mt-4">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
          </motion.div>
          <motion.form
            className="w-full max-w-2xl mx-auto flex items-center rounded-full z-20 bg-white shadow-lg" 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search movie App"
              className="flex-1 px-5 py-4 text-lg rounded-l-full focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <motion.input
              type="submit"
              value="Search"
              className=" h-full bg-purple-500 hover:bg-purple-600 text-white p-5 rounded-r-full font-medium
              focu:ring-2 focus:ring-purple-400 cursor-pointer"
              whileHover={{scale: 1.05}}
            />
          </motion.form>
        </motion.div>
      <div className="mx-auto px-4 sm:px-10 w-full">
        <Trending genres={genres} />
        <TopRated genres={genres} />
        <WhatIsPopular genres={genres} />
      </div>
    </section>
  );
};

export default Home;
