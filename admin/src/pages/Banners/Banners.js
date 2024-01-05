import React from "react";
import Layout from "../Layout/Layout";
import "./banner.scss";
import Left_Banner from "./Left_Banner/Left_Banner";
import Right_Banner from "./Right_Banner/Right_Banner";

const Banners = () => {
  return (
    <div>
      <Layout>
        <div className="banner">
          <Left_Banner />
          <Right_Banner />
        </div>
      </Layout>
    </div>
  );
};

export default Banners;
