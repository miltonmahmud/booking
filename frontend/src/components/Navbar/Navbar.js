import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.scss";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const [publicId, setPublicId] = useState(
    user.photo && user.photo.length > 0 ? user.photo[0] : undefined
  );
  const toggle = () => {
    const body = document.querySelector("body");
    const sidebar = body.querySelector("nav");

    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
      localStorage.setItem("status", "close");
    } else {
      localStorage.setItem("status", "open");
    }
  };
  return (
    <div>
      <div className="top">
        <span className="bars-icon sidebar-toggle" onClick={toggle}>
          <box-icon color="#3554d1" name="menu"></box-icon>
        </span>

        <div className="search-box">
          <i className="search-icon">
            <box-icon color="#3554d1" size="18px" name="search"></box-icon>
          </i>
          <input type="text" placeholder="Search here..." />
        </div>
        <div className="info">
          <box-icon name="shape-square" color="#b9b9b9"></box-icon>
          <box-icon name="bell" color="#b9b9b9"></box-icon>
        </div>
        <img
          className="user-image2"
          src={
            publicId
              ? `https://res.cloudinary.com/dvf6qr707/image/upload/${publicId}`
              : "https://res.cloudinary.com/dvf6qr707/image/upload/v1703860808/dummy_image_vq3ets.png"
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
