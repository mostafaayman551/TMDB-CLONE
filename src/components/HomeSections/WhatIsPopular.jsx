import React, { useEffect, useState } from "react";
import { fetchDataFromApi, IMAGE_BASE_URL } from "../../utils/api";
import Carousel from "../carousel/Carousel";

const WhatIsPopular = ({ genres }) => {
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    fetchPopular();
  }, [category]);
  const fetchPopular = async () => {
    const data = await fetchDataFromApi(`/${category}/popular`);
    if (data) setPopular(data.results);
  };

  return (
    <div className="flex flex-col specialAnimation">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl text-white border-b-2 border-purple-500 pb-1">What's popular</h2>
        <div className="bg-white rounded-full p-1 flex items-center gap-1 relative">
          <div
            className={`absolute left-1 top-1 bg-purple-500 w-24 h-8 rounded-full ${
              category === "tv" ? "translate-x-[100px]" : "translate-x-0"
            } transition-all duration-300`}
          ></div>
          <button
            className={`w-24 h-8 rounded-full z-10 relative ${
              category === "movie" ? "text-white" : "text-black"
            }`}
            onClick={() => setCategory("movie")}
          >
            Movies
          </button>
          <button
            className={`w-24 h-8 rounded-full z-10 relative ${
              category === "tv" ? "text-white" : "text-black"
            }`}
            onClick={() => setCategory("tv")}
          >
            TV Shows
          </button>
        </div>
      </div>
      {/* Popular Carousel */}
      <Carousel
        elements={popular}
        IMAGE_BASE_URL={IMAGE_BASE_URL}
        genres={genres}
        category={category}
      />
    </div>
  );
};

export default WhatIsPopular;
