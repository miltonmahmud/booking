import React from "react";
import { Link } from "react-router-dom";

import "./search_item.scss";
const Search_Item = ({ item }) => {
  return (
    <div>
      <div className="hotel-info">
        <div className="hotel_image">
          <img
            src={`https://res.cloudinary.com/dvf6qr707/image/upload/${item.photos[0]}`}
            alt=""
            style={{ width: "220px", height: "220px" }}
          />
        </div>
        <div className="hotel_details">
          <p className="title">{item.name}</p>
          <p className="location">{item.address}</p>
          <p className="distance">{item.distance}m from center</p>
          <p className="room-name">King Room</p>
          <p className="room-benifit">Free cancellation</p>

          <div className="tag">
            <span>Breakfast</span>
            <span>Wifi</span>
            <span>Spa</span>
            <span>Bar</span>
          </div>
        </div>
        <div className="price_details">
          <div className="review_status">
            <div className="rv">
              <span className="quality">Exceptional</span>
              <span className="review-count">3,014 reviews</span>
            </div>
            <div className="rating">4.8</div>
          </div>
          <div className="hotel_rent">US${item.cheapestPrice}</div>
          <div className="avail">
            <Link to={`/hotels/${item._id}`}>See Availablity</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search_Item;
