import React, { useEffect, useState } from "react";
import { IMAGE_BASE_URL, fetchDataFromApi } from "../../utils/api";
import Carousel from "../carousel/Carousel";
const Trending = ({genres}) => {
  const [trending, setTrending] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    fetchTrending();
  }, [timeWindow]);

  const fetchTrending = async () => {
    const data = await fetchDataFromApi(`/trending/all/${timeWindow}`);
    if (data) setTrending(data.results);
  };
  return (
    <div className="flex flex-col specialAnimation">
      <div className="flex justify-between items-center mb-8 gap-4 overflow-hidden">
        <h2 className="text-lg sm:text-2xl text-white border-b-2 border-purple-500 pb-1 truncate">
          Trending
        </h2>
        <div className="bg-white rounded-full p-1 flex items-center gap-1 relative flex-shrink-0 w-[170px] sm:w-[190px]">
          <div
            className={`absolute left-1 top-1 bg-purple-500 w-[80px] sm:w-[90px] h-8 rounded-full ${
              timeWindow === "week" ? "translate-x-[80px] sm:translate-x-[90px]" : "translate-x-0"
            } transition-all duration-300`}
          ></div>
          <button
            onClick={() => setTimeWindow("day")}
            className={`w-[80px] sm:w-[90px] h-8 rounded-full z-10 relative text-sm sm:text-base ${
              timeWindow === "day" ? "text-white" : "text-black"
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setTimeWindow("week")}
            className={`w-[80px] sm:w-[90px] h-8 rounded-full z-10 relative text-sm sm:text-base ${
              timeWindow === "week" ? "text-white" : "text-black"
            }`}
          >
            This Week
          </button>
        </div>
      </div>
      {/* Trending Carousel */}
      <Carousel elements={trending} IMAGE_BASE_URL={IMAGE_BASE_URL} genres={genres} />
    </div>
  );
};

export default Trending;
