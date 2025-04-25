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
  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query.trim()}`);
    }
  };
  return (
    <section className="w-full bg-blue-950">
        <motion.div
          className="pt-40 mx-auto text-center w-full h-screen relative flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${
              randomBackdrop ? IMAGE_BASE_URL + randomBackdrop : IMAGE_BASE_URL + backdrop[0]
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top right",
          }}
          key={randomBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 z-10"></div>

          <motion.div
            className="p-4 rounded-2xl relative z-30 inline-block mb-10"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-8xl text-white font-bold uppercase">
              Welcome.
            </h1>
            <p className="text-xl text-white font-medium">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
          </motion.div>
          <motion.form
            className="w-full max-w-lg mx-auto sm:max-w-full rounded-full text-xl relative z-20 flex justify-center items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search movie App"
              className="w-full sm:w-5/6 lg:w-4/6 rounded-l-full px-5 py-4 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <motion.input
              type="submit"
              value="Search"
              className="w-full sm:w-1/6 lg:w-1/6 rounded-r-full px-5 py-4 bg-purple-500 cursor-pointer text-white font-medium"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
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
