import React, { useContext } from "react";
import "boxicons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Menu from "../../components/Menu";
import Navigation from "../../components/Navigation/Navigation";

const Layout = ({ children }) => {
  // const { user } = useContext(AuthContext);

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
        <Navigation />

        <div className="dash-content">{children}</div>
      </section>
    </div>
  );
};

export default Layout;
