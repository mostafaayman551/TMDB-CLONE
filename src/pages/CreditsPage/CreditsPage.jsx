import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchDataFromApi, IMAGE_BASE_URL } from "../../utils/api";
import NoPoster from "../../assets/no-poster.png";
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css'; // For the blur effect
import {motion} from 'framer-motion'

const CreditsPage = () => {
  const [credits, setCredits] = useState({});
  const [media, setMedia] = useState([]);
  const navigate = useNavigate();
  const { mediaType, id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMedia();
    fetchCast();
  }, [mediaType, id]);

  const fetchMedia = async () => {
    try {
      const response = await fetchDataFromApi(`${mediaType}/${id}`);
      setMedia(response);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchCast = async () => {
    try {
      const response = await fetchDataFromApi(`${mediaType}/${id}/credits`);
      setCredits(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.section className="min-h-screen bg-blue-950 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="px-6 md:px-20 mx-auto pt-20">
        <div className="flex items-center gap-5 p-5 bg-black/50 mb-5">
          <LazyLoadImage
            src={
              media?.poster_path
                ? IMAGE_BASE_URL + media?.poster_path
                : NoPoster
            }
            alt={media?.title || media?.name}
            className="w-28 aspect-auto"
            effect="blur"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl text-white font-semibold text-center">
              {media?.title || media?.name}
            </h1>
            <button
              className="flex items-center gap-2 border-none hover:text-purple-500"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft size={12} />
              Back To Menu
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-xl text-white font-bold mb-2">
              Cast{" "}
              <span className="text-gray-500">{credits?.cast?.length}</span>
            </h2>
            {credits?.cast?.map((item) => (
              <Link to={`/person/${item.id}`} key={item.id} className="flex items-center gap-5 pb-5">
                <LazyLoadImage
                  src={
                    item?.profile_path
                      ? IMAGE_BASE_URL + item?.profile_path
                      : NoPoster
                  }
                  alt={item?.name}
                  className="w-[70px] aspect-auto object-cover rounded-md"
                  effect="blur"
                />
                <div className="">
                  <h3>{item?.name}</h3>
                  <p className="text-gray-500">{item?.character}</p>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <h2 className="text-xl text-white font-bold mb-2">
              Crew{" "}
              <span className="text-gray-500">{credits?.crew?.length}</span>
            </h2>
            {credits?.crew?.map((item) => (
              <Link to={`/person/${item.id}`} key={item.id} className="flex items-center gap-5 pb-5">
                <LazyLoadImage
                  src={
                    item?.profile_path
                      ? IMAGE_BASE_URL + item?.profile_path
                      : NoPoster
                  }
                  alt={item?.name}
                  className="w-[70px] aspect-auto object-cover rounded-md"
                  effect="blur"
                />
                <div className="">
                  <h3>{item?.name}</h3>
                  <p className="text-gray-500">{item?.job}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CreditsPage;
