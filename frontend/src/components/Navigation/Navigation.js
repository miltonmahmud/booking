import {
  faUser,
  faHouse,
  faBed,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navigation.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navigation = () => {
  const { user } = useContext(AuthContext);
  const [publicId, setPublicId] = useState(
    user && user.photo && user.photo.length > 0 ? user.photo[0] : undefined
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="navigation">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <h2>
                <img
                  className="logo"
                  src="http://localhost:5000/images/logo.png"
                  alt=""
                />
                TRAVEL
              </h2>
            </Link>
          </div>
          <div className="main-nav">
            <ul>
              <li>
                <FontAwesomeIcon icon={faHouse} />
                <Link to="/">Home</Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faBed} />
                <Link to="/All_hotels">Hotels</Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faAddressCard} />
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="sign">
            {user ? (
              <div className="user">
                <Link className="username" to="/profile">
                  <i>
                    <img
                      className="user-image"
                      src={
                        publicId
                          ? `https://res.cloudinary.com/dvf6qr707/image/upload/${publicId}`
                          : "https://res.cloudinary.com/dvf6qr707/image/upload/v1703860808/dummy_image_vq3ets.png"
                      }
                      alt=""
                    />
                  </i>
                  Hi,{user.username}
                </Link>
              </div>
            ) : (
              <Link className="reg" to="/login">
                <FontAwesomeIcon icon={faUser} />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
