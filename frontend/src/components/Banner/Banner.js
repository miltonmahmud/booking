import React from "react";
import "./banner.scss";
import Left_Banner from "./Left_Banner";
import Right_Banner from "./Right_Banner";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <div className="container">
          <Left_Banner />
          <Right_Banner />
        </div>
      </div>
    </>
  );
};

export default Banner;
