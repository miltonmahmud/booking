import React, { useContext } from "react";
import "boxicons";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import "./dashboard.scss";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = ({ children }) => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <div>
      <nav>
        <div className="logo-name">
          <div className="logo-image">
            <Link to="/">
              <img src="http://localhost:5000/images/logo.png" alt="" />
            </Link>
          </div>

          <span className="logo_name">TRAVEL</span>
        </div>

        <Menu />
      </nav>

      <section className="dashboard">
        <Navbar />

        <div className="dash-content">{children}</div>
      </section>
    </div>
  );
};

export default Dashboard;
