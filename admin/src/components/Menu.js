import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons";
import { AuthContext } from "../Context/AuthContext";

const Menu = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    try {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="menu-items">
      <ul className="nav-links">
        <li>
          <Link to="/">
            <span className="f-icon">
              <box-icon color="#3554d1" name="home"></box-icon>
            </span>
            <span className="link-name">Dahsboard</span>
          </Link>
        </li>
        <li>
          <Link to="/hotels">
            <span className="f-icon">
              <box-icon color="#3554d1" name="hotel"></box-icon>
            </span>
            <span className="link-name">Hotels</span>
          </Link>
        </li>
        <li>
          <Link to="/users">
            <span className="f-icon">
              <box-icon color="#3554d1" name="user"></box-icon>
            </span>
            <span className="link-name">Users</span>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <span className="f-icon">
              <box-icon color="#3554d1" name="id-card"></box-icon>
            </span>
            <span className="link-name">Contact</span>
          </Link>
        </li>
        <li>
          <Link to="/hero">
            <span className="f-icon">
              <box-icon color="#3554d1" type="solid" name="image"></box-icon>
            </span>
            <span className="link-name">Hero Section</span>
          </Link>
        </li>
        <li>
          <Link to="/banners">
            <span className="f-icon">
              <box-icon color="#3554d1" name="images"></box-icon>
            </span>
            <span className="link-name">Banners</span>
          </Link>
        </li>
        <li>
          <Link to="/subscriber">
            <span className="f-icon">
              <box-icon color="#3554d1" name="group"></box-icon>
            </span>
            <span className="link-name">Subscribers</span>
          </Link>
        </li>
        <li>
          <Link to="/message">
            <span className="f-icon">
              <box-icon color="#3554d1" name="message-dots"></box-icon>
            </span>
            <span className="link-name">Messages</span>
          </Link>
        </li>
      </ul>

      <ul className="logout-mode">
        <li>
          <Link onClick={logout}>
            <span className="f-icon">
              <box-icon color="#3554d1" name="exit"></box-icon>
            </span>
            <span className="link-name">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
