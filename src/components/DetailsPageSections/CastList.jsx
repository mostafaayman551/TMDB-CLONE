import React, { useState, useEffect } from "react";
import NoPoster from "../../assets/no-poster.png";
import { fetchDataFromApi, IMAGE_BASE_URL } from "../../utils/api";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";

const CastList = ({ mediaType, id, credits }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [mediaType, id]);
  const fetchReviews = async () => {
    try {
      const response = await fetchDataFromApi(`${mediaType}/${id}/reviews`);
      setReviews(response?.results);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading && !credits?.cast.length)
    return (
      <BeatLoader
        color="#a855f7"
        size={16}
        loading={true}
        className="px-6 md:px-20 mx-auto text-center mt-4"
      />
    );
  if (!credits?.cast.length) return null;

  return (
    <div className="px-6 md:px-20 mx-auto my-5">
      <motion.h2 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.8}} className="text-2xl text-white font-bold mb-5">Top Cast</motion.h2>
      <div className="flex gap-4 overflow-x-auto pb-2 mb-5">
        {credits?.cast.slice(0, 12).map((a) => (
          <motion.div key={a.id} className="flex-shrink-0 rounded-lg shadow-md bg-white/90 text-center w-[140px]" initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5 , ease: "easeOut"}}>
            <Link
              to={`/person/${a.id}/${a.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              <LazyLoadImage
                src={
                  a.profile_path ? IMAGE_BASE_URL + a.profile_path : NoPoster
                }
                alt={a.name}
                className="w-full object-cover rounded-t-lg mb-2"
                effect="blur"
              />
              <div className="mt-2 mb-0">
                <h3 className="text-black font-semibold">{a.name}</h3>
                <p className="text-gray-500">{a.character}</p>
              </div>
            </Link>
          </motion.div>
        ))}
        <div className="flex items-center min-w-[120px]">
          <Link
            to={`/${mediaType}/${id}/credits`}
            className="flex items-center gap-1 text-white hover:text-purple-500"
          >
            View More <FaArrowRight size={14} />
          </Link>
        </div>
      </div>
      <div className="w-full border-b border-gray-500 py-5 mb-5">
        <Link
          to={`/${mediaType}/${id}/credits`}
          className=" text-white hover:text-purple-500"
        >
          Full Cast & Crew
        </Link>
      </div>
      <div className="w-full border-b border-gray-500 py-5">
        <h2 className="text-white mb-3">Reviews</h2>
        <div className="grid grid-cols-1 gap-2">
          {reviews?.map((review) => (
            <motion.div
              key={review.id}
              className="rounded-lg shadow-md p-4 border border-gray-500 bg-black/50 h-fit"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5 , delay: 0.2}}
            >
              <p className="flex items-center justify-between border-b-2 border-gray-500 pb-2">
                <strong>
                  By{" "}
                  <span className="font-semibold text-purple-500">
                    {review.author}
                  </span>
                </strong>
                <span className="flex items-center bg-blue-500 p-2 rounded">
                  {review.author_details.rating}
                  <FaStar size={16} className="text-yellow-500" />
                </span>
              </p>
              <p className="mt-2 text-sm font-thin font-mono leading-relaxed">
                {review.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastList;
