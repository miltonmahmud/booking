import React, { useState } from "react";
import Hero_Modal from "../../components/Hero_Modal/Hero_Modal";
import useFetch from "../../hooks/useFetch";
import Layout from "../Layout/Layout";
import "./hero.scss";

const Hero = () => {
  const [id, setId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { data } = useFetch(`/hero_section/65903ea1d4f5450e47583209`);

  const handleClick = (id) => {
    setOpenModal(true);
    setId(id);
  };

  return (
    <div>
      <Layout>
        <div className="hero">
          <table>
            <thead>
              <tr>
                <th className="hero-image">Image</th>
                <th>Headline</th>
                <th>Sub Headline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={
                      data.photo
                        ? `https://res.cloudinary.com/dvf6qr707/image/upload/${data.photo[0]}`
                        : null
                    }
                    alt=""
                  />
                </td>
                <td>{data.headline}</td>
                <td>{data.sub_headline}</td>
                <td>
                  <button onClick={() => handleClick(data._id)}>Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {openModal && <Hero_Modal data={data} setOpen={setOpenModal} />}
      </Layout>
    </div>
  );
};

export default Hero;
