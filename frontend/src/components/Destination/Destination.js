import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./destination.scss";

const Destination = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=newyork,Madrid,London,Paris"
  );

  return (
    <>
      <div className="destination_wraper">
        <div className="destination_content">
          <div className="destination_bg"></div>
          <img src="http://localhost:5000/images/newyork.png" alt="" />
          <div className="destination_details">
            <div className="total_hotel">{data[0]} Hotels</div>
            <div className="bottom_section">
              <div className="location">New York</div>
              <Link to="/all_hotels" className="btn">
                Discover
              </Link>
            </div>
          </div>
        </div>
        <div className="destination_content">
          <div className="destination_bg"></div>
          <img src="http://localhost:5000/images/madrid.png" alt="" />
          <div className="destination_details">
            <div className="total_hotel">{data[1]} Hotels</div>
            <div className="bottom_section">
              <div className="location">Madrid</div>
              <Link to="/all_hotels" className="btn">
                Discover
              </Link>
            </div>
          </div>
        </div>
        <div className="destination_content">
          <div className="destination_bg"></div>
          <img src="http://localhost:5000/images/london.png" alt="" />
          <div className="destination_details">
            <div className="total_hotel">{data[2]} Hotels</div>
            <div className="bottom_section">
              <div className="location">London</div>
              <Link to="/all_hotels" className="btn">
                Discover
              </Link>
            </div>
          </div>
        </div>
        <div className="destination_content">
          <div className="destination_bg"></div>
          <img src="http://localhost:5000/images/paris.png" alt="" />
          <div className="destination_details">
            <div className="total_hotel">{data[3]} Hotels</div>
            <div className="bottom_section">
              <div className="location">Paris</div>
              <Link to="/all_hotels" className="btn">
                Discover
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Destination;
