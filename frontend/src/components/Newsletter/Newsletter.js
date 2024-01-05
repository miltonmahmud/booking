import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Toast from "react-hot-toast";
import API from "../../API/API";

const Newsletter = () => {
  const [subscribe, setSubscribe] = useState("");

  const handleClick = async () => {
    try {
      const res = await API.post("/subscriber", { email: subscribe });
      Toast.success("Subscribed Successfully!");
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };

  return (
    <div className="newsletter">
      <div className="container">
        <div className="icon">
          <FontAwesomeIcon icon={faEnvelopeOpenText} />
        </div>
        <div className="brief">
          <h2>Your Travel Journey Starts Here</h2>
          <p>Sign up, and we'll send the best deals to you</p>
        </div>
        <div className="email">
          <input
            type="text"
            placeholder="Your Email"
            onChange={(e) => setSubscribe(e.target.value)}
          />
          <button type="button" className="btn1" onClick={handleClick}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
