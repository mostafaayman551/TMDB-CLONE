import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchDataFromApi, IMAGE_BASE_URL } from "../../utils/api";
import NoPoster from "../../assets/no-poster.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { FixedSizeList as List } from "react-window";

const CreditsPage = () => {
  const [credits, setCredits] = useState({});
  const [media, setMedia] = useState([]);
  const [itemHeight, setItemHeight] = useState(90);
  const navigate = useNavigate();
  const { mediaType, id } = useParams();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setItemHeight(90);
      } else if (width >= 640) {
        setItemHeight(80);
      } else {
        setItemHeight(70);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemHeight]);
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

  const renderCast = ({ index, style }) => {
    const item = credits?.cast[index];
    if (!item) return null;
    return (
      <div style={style}>
        <Link
          to={`/person/${item.id}`}
          key={item.id}
          className="flex items-center gap-4 hover:bg-black/30 p-2 rounded-lg transition"
        >
          <LazyLoadImage
            src={
              item?.profile_path
                ? IMAGE_BASE_URL + item?.profile_path
                : NoPoster
            }
            alt={item?.name}
            className="w-[70px] h-[70px] object-cover object-center rounded-full"
            effect="blur"
          />
          <div>
            <h3 className="font-semibold">{item?.name}</h3>
            <p className="text-gray-500 text-sm">{item?.character}</p>
          </div>
        </Link>
      </div>
    );
  };

  const renderCrew = ({ index, style }) => {
    const item = credits?.crew[index];
    if (!item) return null;
    return (
      <div style={style}>
        <Link
          to={`/person/${item.id}`}
          key={item.id}
          className="flex items-center gap-4 hover:bg-black/30 p-2 rounded-lg transition"
        >
          <LazyLoadImage
            src={
              item?.profile_path
                ? IMAGE_BASE_URL + item?.profile_path
                : NoPoster
            }
            alt={item?.name}
            className="w-[70px] h-[70px] object-cover object-center rounded-full"
            effect="blur"
          />
          <div>
            <h3 className="font-semibold">{item?.name}</h3>
            <p className="text-gray-500 text-sm">{item?.job}</p>
          </div>
        </Link>
      </div>
    );
  };
  return (
    <motion.section
      className="min-h-screen bg-blue-950 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-6 md:px-20 mx-auto pt-20">
        <div className="flex flex-col md:flex-row items-center gap-5 p-5 bg-black/50 mb-5 rounded-xl">
          <LazyLoadImage
            src={
              media?.poster_path
                ? IMAGE_BASE_URL + media?.poster_path
                : NoPoster
            }
            alt={media?.title || media?.name}
            className="w-32 md:w-40 aspect-auto object-cover rounded-xl"
            effect="blur"
          />
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-2xl text-white font-semibold text-center">
              {media?.title || media?.name}
            </h1>
            <button
              className="flex items-center gap-2 border-none hover:text-purple-500 transition-all duration-300"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft size={14} />
              Back To Menu
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Cast{" "}
              <span className="text-gray-500">{credits?.cast?.length}</span>
            </h2>
            <div className="space-y-5">
              {credits?.cast?.length > 0 && (
                <List
                  height={credits.cast.length * itemHeight}
                  itemCount={credits?.cast?.length}
                  itemSize={itemHeight}
                  width={"100%"}
                  children={renderCast}
                  style={{scrollbarWidth: "none"}}
                ></List>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl text-white font-bold mb-4">
              Crew{" "}
              <span className="text-gray-500">{credits?.crew?.length}</span>
            </h2>
            <div className="space-y-5">
              {credits?.crew?.length > 0 && (
                <List
                  height={credits.crew.length * itemHeight}
                  itemCount={credits?.crew?.length}
                  itemSize={itemHeight}
                  width={"100%"}
                  children={renderCrew}
                  style={{scrollbarWidth: "none"}}
                ></List>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CreditsPage;
