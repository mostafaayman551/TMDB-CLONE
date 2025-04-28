import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CastList from "../../components/DetailsPageSections/CastList";
import DetailsBanner from "../../components/DetailsPageSections/DetailsBanner";
import VideoSection from "../../components/DetailsPageSections/VideoSection";
import SimilarMedia from "../../components/DetailsPageSections/SimilarMedia";
import RecommendationMedia from "../../components/DetailsPageSections/RecommendationMedia";
import { toast } from "react-toastify";
import { fetchDataFromApi } from "../../utils/api";

const DetailsPage = () => {
  const { mediaType, id } = useParams();
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [videoModal, setVideoModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCast();
  }, [mediaType, id]);
  const fetchCast = async () => {
    try {
      const result = await fetchDataFromApi(`/${mediaType}/${id}/credits`);
      setCredits(result);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full bg-blue-950 text-white">
      <DetailsBanner
        mediaType={mediaType}
        id={id}
        credits={credits}
        setVideoModal={setVideoModal}
      />
      <CastList mediaType={mediaType} id={id} credits={credits} />
      <VideoSection
        mediaType={mediaType}
        id={id}
        videoModal={videoModal}
        setVideoModal={setVideoModal}
      />
      <SimilarMedia mediaType={mediaType} id={id} />
      <RecommendationMedia mediaType={mediaType} id={id} />
    </section>
  );
};

export default DetailsPage;
