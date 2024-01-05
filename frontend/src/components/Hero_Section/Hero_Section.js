import React from "react";
import Search from "../Search/Search";
import useFetch from "../../hooks/useFetch";
import Spinner from "../shared/Spinner";
import { faPersonWalkingLuggage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./hero-section.scss";

const Hero_Section = () => {
  const { data, loading } = useFetch("/hero_section/65903ea1d4f5450e47583209");

  const renderHeroBackground = () => {
    if (data.photo && data.photo.length > 0) {
      const cloudinaryBaseURL =
        "https://res.cloudinary.com/dvf6qr707/image/upload/";

      const imageURL = `${cloudinaryBaseURL}${data.photo[0]}`;

      return { backgroundImage: `url(${imageURL})` };
    }

    return {};
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="hero" style={renderHeroBackground()}>
          <span className="travel_icon">
            <FontAwesomeIcon icon={faPersonWalkingLuggage} />
          </span>
          <h1>{data.headline}</h1>
          <p className="sub">{data.sub_headline}</p>
          <Search />
        </div>
      )}
    </>
  );
};

export default Hero_Section;
