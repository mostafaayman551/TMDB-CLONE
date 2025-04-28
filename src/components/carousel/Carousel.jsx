import React from "react";
import CircleRating from "../circleRating/CircleRating";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const Carousel = ({ elements, IMAGE_BASE_URL, genres, category }) => {

  return (
    <div className="relative w-full">
      <Swiper
        className="px-4 sm:px-10"
        modules={[Pagination, Autoplay]}
        grabCursor={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 4000 }}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {elements?.map((movie) => (
          <SwiperSlide
            key={movie?.id}
            className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] relative flex-shrink-0 overflow-hidden"
          >
            <Link to={`/${movie?.media_type || category}/${movie?.id}`} title={movie?.title || movie?.name}>
              <LazyLoadImage
                src={IMAGE_BASE_URL + movie?.poster_path}
                alt={movie?.title || movie?.name}
                className="rounded-md w-[150px] h-[225px]  sm:w-[200px] sm:h-[300px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[400px] object-cover"
                effect="blur"
              />
              <div className="absolute top-[170px] sm:top-[210px] md:top-[290px] lg:left-[10px] lg:top-[340px]">
                <CircleRating rate={movie?.vote_average} />
              </div>
              <div className="flex flex-wrap gap-1 mt-2 overflow-hidden max-h-[70px] px-1">
                {movie?.genre_ids.slice(0, 3).map((id) => (
                  <small
                    key={id}
                    className="bg-purple-500 text-white p-1 rounded-md text-xs truncate max-w-[90px] block"
                  >
                    {genres.find((g) => g.id === id)?.name}
                  </small>
                ))}
              </div>
              <div className="mt-2 max-w-full overflow-hidden px-1">
                <p className="text-xs md:text-sm text-white line-clamp-2 leading-tight break-words overflow-hidden">
                  {movie?.title || movie?.name}
                </p>
                <small className="text-gray-500 font-medium text-xs">
                  {dayjs(movie?.release_date || movie?.first_air_date).format(
                    "MMM D, YYYY"
                  )}
                </small>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <motion.div className="flex justify-between mx-4 sm:mx-10 p-2 my-5 bg-black/50 rounded-full">
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
      </motion.div> */}
    </div>
  );
};

export default Carousel;
