import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import API from "../../service/API/API";
import Spinner from "../shared/Spinner";
import "./modal.scss";

const Modal = ({ setOpen, id }) => {
  const { data, loading } = useFetch(`/contact/${id}`);

  const [location, setLocation] = useState(data.location);
  const [address, setAddress] = useState(data.address);
  const [phone, setPhone] = useState(data.phone);
  const [email, setEmail] = useState(data.email);

  const handleClick = async () => {
    try {
      const createContact = API.put(`/contact/${id}`, {
        location,
        address,
        phone,
        email,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="create_contact">
        {loading ? (
          <Spinner />
        ) : (
          <div className="rContainer">
            <span
              className="close"
              onClick={() => {
                setOpen(false);
              }}
            >
              <box-icon name="x" size="sm"></box-icon>
            </span>
            <h1>Contact Details</h1>
            <hr />
            <label htmlFor="">Location</label>
            <input
              className="form-control"
              type="text"
              Value={data.location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="">Address</label>
            <input
              className="form-control"
              type="text"
              Value={data.address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="">Phone</label>
            <input
              className="form-control"
              type="text"
              Value={data.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="">Email</label>
            <input
              className="form-control"
              type="text"
              Value={data.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <button className="update" onClick={handleClick}>
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
