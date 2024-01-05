import {
  faMapMarkerAlt,
  faBurger,
  faSmoking,
  faSuitcase,
  faKitchenSet,
  faShield,
  faCar,
  faBed,
  faHotel,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Single_hotel.scss";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import Newsletter from "../../components/Newsletter/Newsletter";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../../components/shared/Spinner";
import Reserve from "../../components/Reserve/Reserve";

const Hotel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const days =
    dates && dates[0] ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;

  return (
    <div>
      <Navigation />
      {loading ? (
        <Spinner />
      ) : (
        <div className="Single_hotel">
          <div className="hotel_header">
            <div className="hotel_brand">
              <h1 className="hotel_name">{data.name}</h1>
              <div className="hotel_location">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="lc_icon" />
                {data.address}
              </div>
            </div>
            <div className="stay_duration">
              <span>
                <FontAwesomeIcon icon={faBed} />
              </span>
              <h2>{dates && days} Nights</h2>
            </div>
            <div className="price">
              <div className="fare">
                <span className="from">Total</span>
                <span className="total_price">
                  US${days && days * data.cheapestPrice * options.room}
                </span>
              </div>
              <div className="select_room">
                <button onClick={handleClick}>
                  <span>
                    <FontAwesomeIcon icon={faHotel} />
                  </span>
                  Select Room
                </button>
              </div>
            </div>
          </div>

          <div className="gallery">
            <div className="left_gallery">
              {data.photos && data.photos.length > 0 && (
                <img
                  src={`https://res.cloudinary.com/dvf6qr707/image/upload/${data.photos[0]}`}
                  alt=""
                />
              )}
            </div>
            <div className="right_gallery">
              <div className="single_photo">
                <img src="https://placehold.co/270x270" alt="" />
              </div>
              <div className="single_photo">
                <img src="https://placehold.co/270x270" alt="" />
              </div>
              <div className="single_photo">
                <img src="https://placehold.co/270x270" alt="" />
              </div>
              <div className="single_photo">
                <img src="https://placehold.co/270x270" alt="" />
              </div>
            </div>
          </div>

          <div className="hotel_description">
            <div className="desc_details">
              <h2>Overview</h2>

              <p>{data.desc}</p>
              <hr />
              <div className="extra-info">
                <div>
                  <h2>Bathroom</h2>
                  <ul>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Towels
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Bath or shower
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Private bathroom
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Free toiletries
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Hairdryer
                    </li>
                  </ul>
                </div>
                <div>
                  <h2>Safety & security</h2>
                  <ul>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Fire extinguishers
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      CCTV in common areas
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Smoke alarms
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      24-hour security
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Non-smoking rooms
                    </li>
                  </ul>
                </div>
                <div>
                  <h2>Food & Drink</h2>
                  <ul>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Kid meals
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Breakfast in the room
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Bar
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Restaurant
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      Tea/Coffee maker
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="hotel_info">
              <span className="check">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className="facilities">Facilities</span>

              <hr className="line" />
              <div className="facility">
                <div className="single_facility">
                  <FontAwesomeIcon icon={faBurger} />{" "}
                  <span className="ml-5">Free Breakfast</span>
                </div>
                <div className="single_facility">
                  <FontAwesomeIcon icon={faSmoking} />
                  <span className="ml-5">Smoking rooms</span>
                </div>
                <div className="single_facility">
                  <FontAwesomeIcon icon={faSuitcase} />{" "}
                  <span className="ml-5">Baggage Carrier</span>
                </div>
                <div className="single_facility">
                  <FontAwesomeIcon icon={faKitchenSet} />{" "}
                  <span className="ml-5">kitchen Room</span>
                </div>
                <div className="single_facility">
                  <FontAwesomeIcon icon={faShield} />{" "}
                  <span className="ml-5">Safety</span>
                </div>
                <div className="single_facility">
                  <FontAwesomeIcon icon={faCar} />{" "}
                  <span className="ml-5">Car Parking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Newsletter />
      <Footer />
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
