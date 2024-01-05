import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import API from "../../../service/API/API";
import "./left_banner.scss";
import Toast from "react-hot-toast";

const Left_Banner = () => {
  const { data } = useFetch(`/banner/659116521eece9d9051d320f`);
  const [image, setImage] = useState(
    data.photo && data.photo[0] ? data.photo[0] : null
  );
  const [headline, setHeadline] = useState(data.headline || "");
  const [link, setLink] = useState(data.link || "");

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

  const handleFileChange = async (e) => {
    try {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        const publicId = await uploadImageToCloudinary(selectedFile);
        setImage(publicId);
      } else {
        Toast.info("No new image selected. Existing image will be used.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleClick = async () => {
    try {
      const response = await API.put(`/banner/${data._id}`, {
        photo: image,
        headline,
        link,
      });

      console.log("Update successful:", response.data);
      Toast.success("Left Banner updated successfully");

      window.location.reload();
    } catch (error) {
      console.error("Error updating left banner:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setHeadline(data.headline || "");
      setLink(data.link || "");
    }
  }, [data]);

  return (
    <div>
      <div className="left-banner">
        <h2>Left Banner</h2>
        <img
          src={
            data.photo
              ? `https://res.cloudinary.com/dvf6qr707/image/upload/${data.photo[0]}`
              : null
          }
          alt=""
        />
        <input type="file" onChange={handleFileChange} className="file" />
        <label className="title">Title</label>
        <input
          type="text"
          value={headline}
          className="form-control2"
          onChange={(e) => setHeadline(e.target.value)}
        />
        <label className="title">Link</label>
        <input
          type="text"
          value={link}
          className="form-control2"
          onChange={(e) => setLink(e.target.value)}
        />
        <input
          type="submit"
          onClick={handleClick}
          value="Update"
          className="submit2"
        />
      </div>
    </div>
  );
};

export default Left_Banner;
