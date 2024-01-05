import React, { useState } from "react";
import Layout from "../Layout/Layout";
import useFetch from "../../hooks/useFetch.js";
import Modal from "../../components/Modal/Modal";
import "./contact.scss";
import Spinner from "../../components/shared/Spinner";

const Contact = () => {
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");
  const { data, loading } = useFetch("/contact/6570305588161ec8ad1dbef0");

  const handleClick = (id) => {
    setOpenModal(true);
    setId(id);
  };

  return (
    <div>
      <Layout>
        {loading ? (
          <Spinner />
        ) : (
          <div className="main-content">
            <h2>Contact Details</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.location}
                      style={{ border: "none" }}
                    />
                  </td>
                  <td>{data.address}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleClick(data._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {openModal && <Modal id={id} setOpen={setOpenModal} />}
      </Layout>
    </div>
  );
};

export default Contact;
