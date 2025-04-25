import React, { useRef, useEffect, useState } from "react";
import CircleRating from "../circleRating/CircleRating";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({ elements, IMAGE_BASE_URL, genres, category }) => {
  const scrollRef = useRef(null);
  const [direction, setDirection] = useState("right");

  const scrollAmount = 400;
  const scrollInterval = 4000;

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (dir === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    setTimeout(() => {
      if (container.scrollLeft >= maxScrollLeft) {
        setDirection("left");
      } else if (container.scrollLeft <= 0) {
        setDirection("right");
      }
    }, 500);
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      scroll(direction);
    }, scrollInterval);

    return () => clearInterval(autoScroll);
  }, [direction]);

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scroll-smooth px-10"
        style={{ scrollbarWidth: "none" }}
      >
        {elements?.map((movie) => (
          <motion.div
            key={movie?.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
            className="overflow-hidden flex-shrink-0 relative"
          >
            <Link to={`/${movie?.media_type || category}/${movie?.id}`}>
              <LazyLoadImage
                src={IMAGE_BASE_URL + movie?.poster_path}
                alt={movie?.title || movie?.name}
                className="rounded-md w-[300px] h-[400px] object-cover"
                effect="blur"
              />
              <div className="absolute right-[10px] top-[340px]">
                <CircleRating rate={movie?.vote_average} />
              </div>
              <div className="mb-2">
                {movie?.genre_ids.slice(0, 2).map((id) => (
                  <small
                    key={id}
                    className="bg-purple-500 text-white p-1 mr-2 rounded-md text-xs"
                  >
                    {genres.find((g) => g.id === id)?.name}
                  </small>
                ))}
              </div>
              <div className="">
                <p className="text-lg text-white">
                  {movie?.title || movie?.name}
                </p>
                <small className="text-gray-500 font-medium text-sm">
                  {dayjs(movie?.release_date || movie?.first_air_date).format(
                    "MMM D, YYYY"
                  )}
                </small>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div className="flex justify-between mx-10 p-2 my-5 bg-black/50 rounded-full">
        <motion.button
          onClick={() => scroll("left")}
          className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full shadow-md"
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <FaChevronLeft />
        </motion.button>
        <motion.button
          onClick={() => scroll("right")}
          className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full shadow-md"
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <FaChevronRight />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Carousel;
