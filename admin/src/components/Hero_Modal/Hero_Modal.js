import React, { useState } from "react";
import "./hero_modal.scss";
import API from "../../service/API/API";
import Toast from "react-hot-toast";

const Hero_Modal = ({ data, setOpen }) => {
  const [image, setImage] = useState(data.photo[0]);
  const [headline, setHeadline] = useState(data.headline);
  const [sub_headline, setSub_Headline] = useState(data.sub_headline);

  const handleFileChange = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      const publicId = await uploadImageToCloudinary(selectedFile);

      setImage(publicId);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleClick = async () => {
    try {
      const response = await API.put(`/Hero_Section/${data._id}`, {
        photo: image,
        headline,
        sub_headline,
      });

      console.log("Update successful:", response.data);
      Toast.success("Profile updated successfully");

      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating hero section:", error);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "milton");
      formData.append("cloud_name", "dvf6qr707");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dvf6qr707/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (cloudinaryResponse.ok) {
        const cloudinaryJson = await cloudinaryResponse.json();
        return cloudinaryJson.public_id;
      } else {
        console.error("Cloudinary Error:", cloudinaryResponse.statusText);
        const cloudinaryError = await cloudinaryResponse.json();
        console.error("Cloudinary Error Details:", cloudinaryError);
        throw new Error("Image upload failed");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="hero_modal">
      <div className="create_contact">
        <div className="rContainer2">
          <span
            className="close"
            onClick={() => {
              setOpen(false);
            }}
          >
            <box-icon name="x" size="sm"></box-icon>
          </span>

          <h1>Update Hero Section</h1>
          <hr />
          <div className="modal-image">
            <img
              src={`https://res.cloudinary.com/dvf6qr707/image/upload/${image}`}
              alt=""
            />
            <div>
              <input type="file" className="file" onChange={handleFileChange} />
            </div>
          </div>

          <label>Headline</label>
          <input
            className="form-control3"
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />

          <label>Sub Headline</label>
          <input
            className="form-control3"
            type="text"
            value={sub_headline}
            onChange={(e) => setSub_Headline(e.target.value)}
          />

          <div>
            <button className="update" onClick={handleClick}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero_Modal;
