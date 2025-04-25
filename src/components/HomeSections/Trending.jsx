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
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl text-white border-b-2 border-purple-500 pb-1">
          Trending
        </h2>
        <div className="bg-white rounded-full p-1 flex items-center gap-1 relative">
          <div
            className={`absolute left-1 top-1 bg-purple-500 w-24 h-8 rounded-full ${
              timeWindow === "week" ? "translate-x-[100px]" : "translate-x-0"
            } transition-all duration-300`}
          ></div>
          <button
            onClick={() => setTimeWindow("day")}
            className={`w-24 h-8 rounded-full z-10 relative ${
              timeWindow === "day" ? "text-white" : "text-black"
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setTimeWindow("week")}
            className={`w-24 h-8 rounded-full z-10 relative ${
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
