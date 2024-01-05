import "./contact.scss";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation.js";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import API from "../../API/API";
import Toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { data, loading } = useFetch(`/contact/6570305588161ec8ad1dbef0`);

  const handleClick = async () => {
    try {
      const resp = await API.post("/message", { name, email, message });
      Toast.success("Message Sent Successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="contact">
        <div className="location_map">
          <div className="map_inner">
            <iframe
              src={data.location}
              width="1140"
              height="600"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="icon">
              <i className="fa fa-map-marker"></i>
            </div>
          </div>
        </div>
        <div className="contact_details">
          <div className="left_section">
            <h2>Contacts Us</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              numquam illum nemo animi quam ducimus?
            </p>
            <div className="address">
              <div>
                <p>Address:</p>
                <p>{data.address}</p>
              </div>
              <div>
                <p>Phone:</p>
                <p>{data.phone}</p>
              </div>
              <div>
                <p>Email:</p>
                <p>{data.email}</p>
              </div>
            </div>
          </div>
          <div className="right_section">
            <h2>Leave A Comment</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Temporibus
            </p>
            <div className="message">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="9"
              className="message_details"
              placeholder="Your Message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button type="button" className="btn" onClick={handleClick}>
              Send Message
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Contact;
