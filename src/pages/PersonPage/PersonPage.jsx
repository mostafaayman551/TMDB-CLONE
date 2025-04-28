import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchDataFromApi, IMAGE_BASE_URL } from "../../utils/api";
import NoPoster from "../../assets/no-poster.png";
import { FaFacebookF, FaImdb, FaInstagram, FaTwitter } from "react-icons/fa";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // For the blur effect

const PersonPage = () => {
  const { id, name } = useParams();
  const [personDetails, setPersonDetails] = useState({});
  const [knownFor, setKnownFor] = useState([]);
  const [socialIds, setSocialIds] = useState({});
  const [personCredits, setPersonCredits] = useState({});

  const navigate = useNavigate();

 
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPersonDetails();
    fetchSocialIds();
    combinedCredits();
  }, [id]);
  
  useEffect(() => {
    if (personDetails?.name && !name) {
      const prettyName = personDetails.name.toLowerCase().replace(/\s+/g, "-");
      navigate(`/person/${id}/${prettyName}`, { replace: true });
    }
    if (personDetails) {
      fetchKnownFor();
    }
  }, [personDetails, name, id, navigate]);

  const fetchPersonDetails = async () => {
    try {
      const response = await fetchDataFromApi(`/person/${id}`);
      setPersonDetails(response);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchKnownFor = async () => {
    try {
      let nameQuery = encodeURIComponent(personDetails?.name);
      const response = await fetchDataFromApi(
        `/search/person?query=${nameQuery}`
      );
      const mergedResults = response?.results?.reduce((accum, currentObj) => {
        accum.push(...currentObj.known_for);
        return accum;
      }, []);
      setKnownFor(mergedResults);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchSocialIds = async () => {
    try {
      const response = await fetchDataFromApi(`/person/${id}/external_ids`);
      setSocialIds(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const combinedCredits = async () => {
    try {
      const response = await fetchDataFromApi(`/person/${id}/combined_credits`);
      setPersonCredits(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.section
      className="min-h-screen bg-blue-950 overflow-hidden lazy-loaded-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="px-6 md:px-20 mx-auto pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-white">
          <LazyLoadImage
            src={
              personDetails?.profile_path
                ? IMAGE_BASE_URL + personDetails?.profile_path
                : NoPoster
            }
            alt={personDetails?.name}
            className="w-[200px] sm:w-[300px] lg:w-full aspect-auto object-cover object-center sm:m-auto rounded-2xl shadow-xl md:col-span-1"
            effect="blur"
          />
          <div className="bg-black/20 rounded-lg p-4 md:col-span-2">
            <h1 className="text-3xl font-bold mb-5">{personDetails?.name}</h1>
            <div className="mb-3">
              <h3 className="text-2xl mb-2">Biography</h3>
              {personDetails?.biography?.length > 0 ? (
                <p className="text-sm font-thin leading-relaxed mb-2">
                  {personDetails?.biography}
                </p>
              ) : (
                <p>We don't have a biography for {personDetails?.name}</p>
              )}
            </div>
          </div>
          <div className="md:col-span-1 bg-black/20 rounded-lg p-4">
            <div className="flex items-center gap-4 my-3">
              <Link
                to={`https://www.imdb.com/name/${socialIds?.imdb_id}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:rotate-[360deg] transition-transform duration-300"
              >
                <FaImdb size={26} className="text-imdb" />
              </Link>
              {socialIds?.facebook_id && (
                <Link
                  to={`https://www.facebook.com/${socialIds?.facebook_id}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="hover:rotate-[360deg] transition-transform duration-300"
                >
                  <FaFacebookF size={26} className="text-facebook" />
                </Link>
              )}
              {socialIds?.twitter_id && (
                <Link
                  to={`https://twitter.com/${socialIds?.twitter_id}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="hover:rotate-[360deg] transition-transform duration-300"
                >
                  <FaTwitter size={26} className="text-twitter" />
                </Link>
              )}
              {socialIds?.instagram_id && (
                <Link
                  to={`https://www.instagram.com/${socialIds?.instagram_id}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="hover:rotate-[360deg] transition-transform duration-300"
                >
                  <FaInstagram size={26} className="text-instagram" />
                </Link>
              )}
            </div>
            <h3 className="text-2xl mb-2">Personal Info</h3>
            <div>
              <h5>Know For</h5>
              <p className="text-gray-500">
                {personDetails?.known_for_department}
              </p>
            </div>
            <div>
              <h5>Credits</h5>
              <p className="text-gray-500">
                {personCredits?.cast?.length + personCredits?.crew?.length}
              </p>
            </div>
            <div>
              <h5>Gender</h5>
              <p className="text-gray-500">
                {personDetails?.gender === 1 ? "Female" : "Male"}
              </p>
            </div>

            {personDetails?.deathday ? (
              <>
                <div>
                  <h5>Birthday</h5>
                  <p className="text-gray-500">
                    {personDetails?.birthday
                      ? dayjs(personDetails?.birthday).format("MMM D, YYYY")
                      : "Unknown"}
                  </p>
                </div>
                <div>
                  <h5>Deathday</h5>
                  <p className="text-gray-500">
                    {dayjs(personDetails?.deathday).format("MMM D, YYYY")} (
                    {dayjs(personDetails?.deathday).diff(
                      personDetails?.birthday,
                      "year"
                    )}{" "}
                    years old)
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h5>Birthday</h5>
                  <p className="text-gray-500">
                    {personDetails?.birthday
                      ? dayjs(personDetails?.birthday).format("MMM D, YYYY")
                      : "Unknown"}{" "}
                    ({dayjs().diff(personDetails?.birthday, "year")} years old)
                  </p>
                </div>
              </>
            )}

            <div>
              <h5>Place of Birth</h5>
              <p className="text-gray-500">{personDetails?.place_of_birth}</p>
            </div>
            <div>
              <h5>Also Known As</h5>
              <p className="text-gray-500">
                {personDetails?.also_known_as?.join(", ")}
              </p>
            </div>
          </div>
          <div className="overflow-hidden p-4 bg-black/20 rounded-lg md:col-span-2">
            <h3 className="text-2xl mb-2">Known For</h3>
            <div className="flex overflow-x-auto space-x-4 p-4">
              {knownFor?.map((item) => (
                <motion.div key={item.id} className="flex-shrink-0 rounded-lg shadow-md text-center mx-2 overflow-hidden relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 17 }}
                >
                  <Link
                    to={`/${item.media_type}/${item.id}`}
                  >
                    <LazyLoadImage
                      src={
                        item.poster_path
                          ? IMAGE_BASE_URL + item.poster_path
                          : NoPoster
                      }
                      alt={item.title}
                      className="w-[200px] h-[300px] object-cover"
                      effect="blur"
                    />
                    <p className="absolute bg-white/90 text-black bottom-0 w-full p-3 text-sm">
                      {item.title || item.name}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PersonPage;
