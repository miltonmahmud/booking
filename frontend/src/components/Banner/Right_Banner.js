import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

const RightBanner = () => {
  const { data, loading, error } = useFetch("/banner/659116af1eece9d9051d3211");
  const publicId =
    data && data.photo && data.photo.length > 0 ? data.photo[0] : undefined;

  if (error) {
    return <p>Error loading data</p>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="left_banner">
          {publicId && (
            <img
              src={`https://res.cloudinary.com/dvf6qr707/image/upload/${publicId}`}
              alt="Banner Image"
              style={{ width: "555px", height: "355px" }}
            />
          )}
          <div className="banner_content">
            <h2>{data.headline}</h2>
            {data.link && (
              <a href={data.link} target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RightBanner;
