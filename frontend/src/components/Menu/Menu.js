import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons";

const Menu = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="menu-items">
      <ul className="nav-links">
        <li>
          <Link to="/profile">
            <span className="f-icon">
              <box-icon color="#3554d1" name="hotel"></box-icon>
            </span>
            <span className="link-name">Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/">
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
