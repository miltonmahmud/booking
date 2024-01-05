import React from "react";
import "./navigation.scss";

const Navigation = () => {
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
          className="user"
          src="http://localhost:5000/images/user.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Navigation;
