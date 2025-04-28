import React, { useEffect, useState } from "react";
import { fetchDataFromApi, IMAGE_BASE_URL } from "../../utils/api";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
import NoPoster from "../../assets/no-poster.png";
import { FaRegCirclePlay } from "react-icons/fa6";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import {LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css'; // For the blur effect



const DetailsBanner = ({ mediaType, id, credits, setVideoModal }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchDetails();
  }, [mediaType, id]);
  const fetchDetails = async () => {
    try {
      const result = await fetchDataFromApi(`/${mediaType}/${id}`);
      setData(result);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const directors = credits?.crew?.filter((c) => c.job === "Director");
  const writers = credits?.crew?.filter((c) =>
    ["Writer", "Screenplay", "Story", "Creator"].includes(c.job)
  );
  const {
    backdrop_path,
    poster_path,
    name,
    title,
    overview,
    release_date,
    first_air_date,
    status,
    runtime,
    genres,
    tagline,
    vote_average,
    episode_run_time,
  } = data;
  if (!data)
    return (
      <BeatLoader
        color="#a855f7"
        size={16}
        loading={true}
        className="px-6 md:px-20 mx-auto text-center mt-4"
      />
    );

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={backdrop_path ? IMAGE_BASE_URL + backdrop_path : NoPoster}
          alt={name || title}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/60 to-transparent"></div>
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-5 px-4 sm:px-6 md:px-20 pt-24 sm:pt-28 pb-10 mx-auto">
        <LazyLoadImage
          src={poster_path ? IMAGE_BASE_URL + poster_path : NoPoster}
          alt={name || title}
          className="max-w-[300px] rounded-2xl shadow-xl object-cover flex-shrink-0"
          effect="blur"
        />
        <div className="flex flex-col items-start bg-black/20 rounded-lg p-4">
          <h1 className="text-4xl text-white mb-2 font-bold">
            {name || title} (
            {dayjs(release_date || first_air_date).format("YYYY")})
          </h1>
          <small className="text-gray-500 text-lg mb-2 font-semibold">
            {tagline}
          </small>
          <ul className="flex mb-5">
            {genres?.map((g) => (
              <li
                key={g.id}
                className="bg-purple-500 text-white p-1 mr-2 rounded-md"
              >
                {g.name}
              </li>
            ))}
          </ul>
          {/* Rate & Play */}
          <div className="flex items-center gap-4 mb-3">
            <CircleRating rate={vote_average} />
            <button onClick={() => setVideoModal(true)}>
              <FaRegCirclePlay
                size={50}
                className="text-white hover:text-purple-500 cursor-pointer transition-colors duration-300"
              />
            </button>
          </div>
            {/* Overview */}
            <div className="mb-5">
              <h2 className="text-2xl mb-2">Overview</h2>
              <p className="text-md leading-relaxed">{overview}</p>
            </div>
            {/* meta data */}
            <div className="">
              <div className="flex gap-2 text-purple-500 font-semibold border-b border-gray-500 pb-2 mb-2">
                <span className="text-white">Status:</span>
                {status}
              </div>
              <div className="flex gap-2 text-purple-500 font-semibold border-b border-gray-500 pb-2 mb-2">
                <span className="text-white">Release Date:</span>
                {dayjs(release_date || first_air_date).format("MMM D, YYYY")}
              </div>
              <div className="flex gap-2 text-purple-500 font-semibold border-b border-gray-500 pb-2 mb-2">
                <span className="text-white">Runtime:</span>
                {episode_run_time && episode_run_time.length
                  ? `${Math.floor(episode_run_time[0] / 60)}h ${
                      episode_run_time[0] % 60
                    }min`
                  : `${Math.floor(runtime / 60)}h ${runtime % 60}min`}
              </div>
              <div className="flex gap-2 text-purple-500 font-semibold border-b border-gray-500 pb-2 mb-2">
                <span className="text-white">Director:</span>
                {directors.length
                  ? directors.map((d) => d.name).join(", ")
                  : "No Credits Available"}
              </div>
              <div className="flex gap-2 text-purple-500 font-semibold ">
                <span className="text-white">Writer:</span>
                {writers.length
                  ? writers.map((w) => w.name).join(", ")
                  : "No Credits Available"}
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsBanner;
