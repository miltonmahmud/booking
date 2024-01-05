import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Hotel_Slider.scss";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const Hotel_Slider = () => {
  const { data } = useFetch(`/hotels?limit=4`);

  return (
    <>
      <div className="hotel_slider">
        <Swiper
          spaceBetween={25}
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data &&
            data.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="card">
                  <div className="card_image">
                    <img
                      src={`https://res.cloudinary.com/dvf6qr707/image/upload/${item.photos[0]}`}
                      alt="image"
                      width="265"
                      height="265"
                    />
                    <span className="heart">
                      <FontAwesomeIcon icon={faHeart} />
                    </span>
                  </div>
                  <div className="card_title">
                    <Link to={`/hotels/${item._id}`}>{item.name}</Link>
                  </div>
                  <div className="card_location">{item.address}</div>
                  <div className="details">
                    <div className="rating">4.8</div>
                    <div className="quality">Exceptional</div>
                    <div className="review">3,014 reviews</div>
                  </div>
                  <div className="hotel_cost">
                    <span className="f-500">Starting from</span>
                    <span className="cost">US${item.cheapestPrice}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default Hotel_Slider;
