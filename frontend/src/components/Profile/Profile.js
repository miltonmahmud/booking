import React, { useContext, useEffect, useState } from "react";
import API from "../../API/API";
import Toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import Dashboard from "../../pages/Dashboard/Dashboard";
import "./profile.scss";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);

  const [publicId, setPublicId] = useState(
    user.photo && user.photo.length > 0 ? user.photo[0] : undefined
  );
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [bio, setBio] = useState(user.bio);
  const [file, setFile] = useState(null);

  // Update publicId when user.photo changes
  useEffect(() => {
    setPublicId(
      user.photo && user.photo.length > 0 ? user.photo[0] : undefined
    );
  }, [user.photo]);

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let photoData = { public_id: publicId };

      // If a file is selected, upload it to Cloudinary
      if (file) {
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", file);
        cloudinaryData.append("upload_preset", "milton");
        cloudinaryData.append("cloud_name", "dvf6qr707");

        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dvf6qr707/image/upload",
          {
            method: "POST",
            body: cloudinaryData,
          }
        );

        // If upload is successful, update publicId
        if (cloudinaryResponse.ok) {
          const cloudinaryJson = await cloudinaryResponse.json();
          setPublicId(cloudinaryJson.public_id);
          photoData = { public_id: cloudinaryJson.public_id };
        } else {
          // Handle Cloudinary upload error
          console.error("Cloudinary Error:", cloudinaryResponse.statusText);
          const cloudinaryError = await cloudinaryResponse.json();
          console.error("Cloudinary Error Details:", cloudinaryError);
          throw new Error("Image upload failed");
        }
      }

      // Update user profile data in the backend
      const res = await API.put(`/users/${user._id}`, {
        username,
        phone,
        address,
        photo: photoData.public_id, // Send only the public_id as a string
        bio,
      });

      // Display success toast
      Toast.success("Profile updated successfully");
    } catch (error) {
      // Handle profile update error
      console.error("Error updating profile:", error);
      Toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Dashboard>
      <div className="profile">
        <div className="profile-image">
          <img
            src={
              publicId
                ? `https://res.cloudinary.com/dvf6qr707/image/upload/${publicId}`
                : "https://placehold.co/330x330"
            }
            alt=""
          />
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="details">
          <form onSubmit={handleSubmit}>
            <h2>Profile</h2>
            <label>Username</label>
            <input
              className="form2"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <br />
            <label>Email</label>
            <br />
            <input
              className="form2"
              type="text"
              name="email"
              value={email}
              disabled
            />
            <br />
            <label>Phone</label>
            <br />
            <input
              className="form2"
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <label>Address</label>
            <br />
            <input
              className="form2"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <br />
            <label>Bio</label>
            <br />
            <textarea
              className="bio"
              name="bio"
              value={bio}
              cols="30"
              rows="10"
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            <input type="submit" name="Submit" value="Update" />
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default Profile;
