import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/API/API";
import { toast } from "react-hot-toast";
import "./hotel.scss";

const initialHotelState = {
  name: "",
  type: "",
  city: "",
  address: "",
  distance: "",
  title: "",
  desc: "",
  photos: [],
  cheapestPrice: "",
  featured: false,
};

const Hotel = ({ setOpen, hotelid: initialHotelId = null }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(initialHotelState);
  const [hotelid, setHotelId] = useState(initialHotelId);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        if (hotelid) {
          const response = await API.get(`/hotels/find/${hotelid}`);
          setHotel(response.data);

          setSelectedImages(
            response.data.photos.map(
              (photo) =>
                `https://res.cloudinary.com/dvf6qr707/image/upload/${photo}`
            )
          );
        } else {
          setHotel(initialHotelState);
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
  }, [hotelid]);

  const resetForm = () => {
    setHotel(initialHotelState);
    setHotelId(null);
  };

  const handleChange = (field, value) => {
    setHotel((prevHotel) => ({ ...prevHotel, [field]: value }));
  };

  const handleCheckboxChange = () => {
    setHotel((prevHotel) => ({ ...prevHotel, featured: !prevHotel.featured }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const cloudinaryURLs = selectedImages.slice();

    files.forEach(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "milton");
      data.append("cloud_name", "dvf6qr707");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dvf6qr707/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (res.ok) {
          const cloudData = await res.json();
          cloudinaryURLs.push(
            `https://res.cloudinary.com/dvf6qr707/image/upload/${cloudData.public_id}`
          );
        } else {
          console.error("Cloudinary Error:", res.statusText);
          const cloudError = await res.json();
          console.error("Cloudinary Error Details:", cloudError);
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading images:", error);
        throw new Error("Error uploading images");
      }
    });

    setSelectedImages(cloudinaryURLs);
  };

  const uploadImages = async () => {
    const uploadedFilenames = [];

    try {
      for (const selectedImage of selectedImages) {
        const data = new FormData();
        data.append("file", selectedImage);
        data.append("upload_preset", "milton");
        data.append("cloud_name", "dvf6qr707");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dvf6qr707/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (res.ok) {
          const cloudData = await res.json();
          uploadedFilenames.push(cloudData.public_id);
        } else {
          console.error("Cloudinary Error:", res.statusText);
          const cloudError = await res.json();
          console.error("Cloudinary Error Details:", cloudError);
          throw new Error("Image upload failed");
        }
      }

      return uploadedFilenames;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Error uploading images");
    }
  };

  const handleClick = async () => {
    try {
      const uploadedFilenames = await uploadImages();

      const photos =
        uploadedFilenames.length > 0 ? uploadedFilenames : hotel.photos;

      const hotelData = {
        name: hotel.name,
        type: hotel.type,
        city: hotel.city,
        address: hotel.address,
        distance: hotel.distance,
        title: hotel.title,
        desc: hotel.desc,
        cheapestPrice: hotel.cheapestPrice,
        featured: hotel.featured,
        photos: photos,
      };

      if (hotelid) {
        await API.put(`/hotels/${hotelid}`, hotelData);
      } else {
        await API.post("/hotels", hotelData);
      }

      resetForm();
      setOpen(false);
      window.location.reload();
      navigate("/hotels");
      toast.success(`Hotel ${hotelid ? "updated" : "created"} successfully!`);
    } catch (error) {
      console.error("Error handling click:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="create_hotel">
      <div className="rContainer4">
        <span
          className="close"
          onClick={() => {
            resetForm();
            setOpen(false);
          }}
        >
          <box-icon name="x" size="sm"></box-icon>
        </span>
        <h2>{hotelid ? "Edit Hotel" : "Create Hotel"}</h2>
        <hr />
        <form
          onSubmit={(e) => e.preventDefault()}
          encType="multipart/form-data"
        >
          <div>
            <label className="label">Hotel Name</label>
            <input
              className="form-control5"
              type="text"
              value={hotel.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="title">
            <div>
              <label className="label">Title</label>
              <input
                className="form-control5"
                type="text"
                value={hotel.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Distance</label>
              <input
                className="form-control5"
                type="text"
                value={hotel.distance || ""}
                onChange={(e) => handleChange("distance", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              value={hotel.desc || ""}
              onChange={(e) => handleChange("desc", e.target.value)}
              name=""
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div className="type">
            <div>
              <label className="label">Hotel Type</label>
              <input
                className="form-control5"
                value={hotel.type || ""}
                onChange={(e) => handleChange("type", e.target.value)}
                type="text"
              />
            </div>
            <div>
              <label className="label">City</label>
              <input
                className="form-control5"
                value={hotel.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                type="text"
              />
            </div>
            <div>
              <label className="label">Price</label>
              <input
                className="form-control5"
                type="number"
                value={hotel.cheapestPrice || ""}
                onChange={(e) => handleChange("cheapestPrice", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Add Images</label>
            <input
              className="form-control5"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <div>
              {selectedImages.map((image, index) => (
                <img
                  className="all-image"
                  key={index}
                  src={image}
                  alt={`Selected Image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="label">Address</label>
            <input
              className="form-control5"
              value={hotel.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              type="text"
            />
          </div>
          <div className="type2">
            <div className="featured">
              <label htmlFor="featured">Featured:</label>
              <input
                className="form-control5"
                type="checkbox"
                name="featured"
                checked={hotel.featured}
                onChange={() => handleCheckboxChange()}
              />
              True
              <input
                className="form-control5"
                type="checkbox"
                name="featured"
                checked={!hotel.featured}
                onChange={() => handleCheckboxChange()}
              />
              False
            </div>
          </div>
          <button className="submit-form" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hotel;
