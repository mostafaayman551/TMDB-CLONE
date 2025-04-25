import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams, Link } from "react-router-dom";
import { fetchDataFromApi, IMAGE_BASE_URL } from "../../utils/api";
import dayjs from "dayjs";
import NoPoster from "../../assets/no-poster.png";
import { BeatLoader } from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    resetSearch();
  }, [query]);

  const resetSearch = async () => {
    setPage(1);
    const result = await fetchDataFromApi(`/search/multi`, {
      query,
      page: 1,
    });
    setData(result?.results || []);
    setHasMore(result?.page < result?.total_pages);
    setTotalResults(result?.total_results || 0);
    setLoading(false);
  };

  const fetchMore = async () => {
    const nextPage = page + 1;
    const result = await fetchDataFromApi(`/search/multi`, {
      query,
      page: nextPage,
    });
    setData((prev) => [...prev, ...result?.results]);
    setPage(nextPage);
    setHasMore(nextPage < result?.total_pages);
  };

  return (
    <section className="w-full bg-blue-950 pt-40 mx-auto px-4 sm:px-10 min-h-screen">
      <h2 className="text-2xl text-white mb-5">
        Found <span className="text-purple-500 font-bold">{totalResults}</span>{" "}
        results for '{query}'
      </h2>
      {loading ? (
        <div className="flex justify-center items-center p-10">
          <BeatLoader color="#a855f7" size={16} loading={true} />
        </div>
      ) : data?.length === 0 ? (
        <div className="text-white text-center mt-10">
          <p className="text-xl">Sorry, Results not found!</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center p-4">
              <BeatLoader color="#a855f7" size={16} loading={true} />
            </div>
          }
        >
          <div className="grid grid-cols-5 gap-4 overflow-hidden">
            {data?.map((item) => (
              <Link
                to={`/${item?.media_type}/${item?.id}`}
                key={item?.id}
                className="overflow-hidden"
              >
                <LazyLoadImage
                  src={
                    item?.poster_path
                      ? IMAGE_BASE_URL + item?.poster_path
                      : NoPoster
                  }
                  alt={item?.title || item?.name}
                  className="rounded-md w-full h-[400px] object-cover"
                  effect="blur"
                />
                <div className="mt-2">
                  <p className="text-xl text-white">
                    {item?.title || item?.name}
                  </p>
                  <small className="text-gray-500 font-medium text-sm">
                    {dayjs(item?.release_date || item?.first_air_date).format(
                      "MMM D, YYYY"
                    )}
                  </small>
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </section>
  );
};

export default SearchPage;
