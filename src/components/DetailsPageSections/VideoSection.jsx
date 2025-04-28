import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDataFromApi } from "../../utils/api";
import { BeatLoader } from "react-spinners";
import { FaX } from "react-icons/fa6";
const VideoSection = ({ mediaType, id, videoModal, setVideoModal }) => {
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoModal) {
      fetchVideo();
    }
  }, [mediaType, id, videoModal]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const response = await fetchDataFromApi(`/${mediaType}/${id}/videos`);
      const trailer = response?.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setVideoKey(trailer?.key);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {videoModal && (
        <motion.div
          key="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setVideoModal(false)}
        >
          <div
            className="relative w-full max-w-2xl md:max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModal(false)}
              className="absolute top-4 right-4 text-white bg-purple-500 p-1 rounded-full group hover:bg-white transition"
            >
              <FaX
                size={20}
                className="text-white group-hover:text-purple-500"
              />
            </button>
            <div className="aspect-video bg-black">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <BeatLoader
                    color="#a855f7"
                    size={16}
                    loading={true}
                    className="text-center"
                  />
                </div>
              ) : videoKey ? (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${videoKey}`}
                  width="100%"
                  height="100%"
                  playing
                  controls
                />
              ) : (
                <p className="text-white flex justify-center items-center h-full text-lg">
                  No Trailer Available Right Now
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoSection;
