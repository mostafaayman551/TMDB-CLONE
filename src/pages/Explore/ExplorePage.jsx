import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchDataFromApi, IMAGE_BASE_URL } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import { BeatLoader } from "react-spinners";
import NoPoster from "../../assets/no-poster.png";
import dayjs from "dayjs";
import CircleRating from "../../components/circleRating/CircleRating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";

const sortOptions = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Least Popular" },
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "vote_average.asc", label: "Least Rated" },
  { value: "release_date.desc", label: "Latest" },
  { value: "release_date.asc", label: "Oldest" },
  { value: "title.asc", label: "A-Z" },
  { value: "title.desc", label: "Z-A" },
];
const selectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "8px",
    padding: "3px",
  }),
  menu: (base) => ({
    ...base,
    scrollbarWidth: "none",
    overflow: "hidden",
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      display: "none",
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#172554",
    borderRadius: "8px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#fff",
  }),
};
const ExplorePage = () => {
  const { mediaType } = useParams();
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    setData([]);
    setSelectedGenres([]);
    setSelectedSort(null);
    fetchGenres();
  }, [mediaType]);

  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData(1, true);
  }, [selectedGenres, selectedSort]);

  const fetchGenres = async () => {
    const result = await fetchDataFromApi(`/genre/${mediaType}/list`);
    setGenres(
      result?.genres?.map((g) => ({
        value: g.id,
        label: g.name,
      })) || []
    );
  };

  const fetchData = async (pageToFetch = 1, reset = false) => {
    setLoading(true);
    const genreIds = selectedGenres.map((g) => g.value).join(",");
    const sort = selectedSort?.value || "popularity.desc";
    const result = await fetchDataFromApi(`/discover/${mediaType}`, {
      with_genres: genreIds,
      sort_by: sort,
      page: pageToFetch,
    });
    const newResults = result?.results || [];
    setData((prev) => (reset ? newResults : [...prev, ...newResults]));
    setHasMore(pageToFetch < result?.total_pages);
    setLoading(false);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    fetchData(nextPage);
    setPage(nextPage);
  };

  return (
    <section className="min-h-screen w-full bg-blue-950 pt-40 mx-auto px-4 sm:px-10">
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <h2 className="text-2xl text-white sm: mb-5">
          Explore {mediaType === "movie" ? "Movies" : "TV Shows"}
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 mb-8">
          <div className="text-sm">
            <Select
              isMulti
              name="genres"
              value={selectedGenres}
              options={genres}
              onChange={setSelectedGenres}
              className="text-black min-w-[250px]"
              placeholder="Filter by genres"
              styles={selectStyles}
            />
          </div>
          <div className="text-sm">
            <Select
              options={sortOptions}
              value={selectedSort}
              onChange={setSelectedSort}
              className="text-black min-w-[250px]"
              placeholder="Sort by"
              styles={selectStyles}
            />
          </div>
        </div>
      </div>
      {loading && page === 1 ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <BeatLoader color="#a855f7" size={16} loading={true} />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center p-4">
              <BeatLoader color="#a855f7" size={16} loading={true} />
            </div>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data?.map((item) => (
              <motion.div key={item?.id} initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} 
              className="bg-black/20 rounded-md  overflow-hidden"
              >
                <Link
                  to={`/${item?.media_type || mediaType}/${item?.id}`}
                >
                  <LazyLoadImage
                    src={
                      item?.poster_path
                        ? IMAGE_BASE_URL + item?.poster_path
                        : NoPoster
                    }
                    alt={item?.title || item?.name}
                    className="rounded-ss-md rounded-se-md w-full aspect-[2/3] object-cover overflow-hidden"
                    effect="blur"
                  />
                  <div className="flex justify-between items-start p-5">
                    <div className="">
                      <p className="text-xl text-white">
                        {item?.title || item?.name}
                      </p>
                      <small className="text-gray-500 font-medium text-sm">
                        {dayjs(
                          item?.release_date || item?.first_air_date
                        ).format("MMM D, YYYY")}
                      </small>
                    </div>
                    <div>
                      <CircleRating rate={item?.vote_average} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </section>
  );
};

export default ExplorePage;
