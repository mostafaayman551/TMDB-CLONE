import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchDataFromApi, IMAGE_BASE_URL } from "../../utils/api";
import { Link } from "react-router-dom";
import NoPoster from "../../assets/no-poster.png";
import dayjs from "dayjs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css'; // For the blur effect


const SimilarMedia = ({ mediaType, id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (mediaType && id) {
      fetchSimilar();
    }
  }, []);
  const fetchSimilar = async () => {
    try {
      const response = await fetchDataFromApi(`/${mediaType}/${id}/similar`);
      setData(response?.results);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {data?.length > 0 && (
        <>
          <h2 className="text-2xl text-white font-bold mb-2">Similar</h2>
          <div className="overflow-x-auto py-5">
            <div className="flex gap-4">
              {data?.slice(0, 20).map((item) => (
                <Link
                  to={`/${mediaType}/${item?.id}`}
                  key={item?.id}
                  className="rounded-lg shadow-md bg-white/80 text-center w-[240px] flex-shrink-0 overflow-hidden relative hover:scale-105 hover:translate-x-[30px] hover:z-50 hover:bg-transparent transition-all duration-300 group"
                >
                  <LazyLoadImage
                    src={
                      item?.poster_path
                        ? IMAGE_BASE_URL + item?.poster_path
                        : NoPoster
                    }
                    alt={item?.title || item?.name}
                    className="w-full h-[400px] group-hover:h-full object-cover object-center rounded-t-lg mb-2"
                    effect="blur"
                  />
                  <div className="flex justify-between items-center mb-1 px-1 text-black group-hover:hidden">
                    <h3 className="font-semibold">
                      {item?.title || item?.name}
                    </h3>
                    <p className="font-medium">
                      {dayjs(item?.release_date || item?.first_air_date).format(
                        "MMM YYYY"
                      )}
                    </p>
                  </div>
                  <div className="absolute bottom-[-100%] left-0 w-full bg-white/80 text-black font-black  text-wrap text-sm leading-relaxed text-center p-1 group-hover:bottom-0 transition-all duration-300">
                    <p className="first-letter:text-purple-500 first-letter:font-bold first-letter:text-lg line-clamp-[10]">
                      Overview: {item?.overview}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SimilarMedia;
