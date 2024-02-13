import React, { useContext, useState } from "react";
import axios from "axios";
import {AdvancedImage} from '@cloudinary/react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { cld } from "../../../utils/Services/cloudinary";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";

const Home = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [uploadedImg, setUploadedImg] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
     const imagedata =  reader.result;
     console.log(imagedata);
     setImage(imagedata)
    }
  }

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    previewFile(file);

  };

  const myImage = cld.image('User_Avatar/18da0578dbfd41dd/avatar');

  myImage
  .resize(thumbnail().width(500).height(500));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/cloudinary/uploadprofileimage', {
        photo: image
      },
      {
        headers: {
          "Content-Type" : "application/json"
        }
      }
      )

      console.log(response);
      const uploadedImage = response?.data?.data?.public_id;
      setUploadedImg(uploadedImage);
      console.log(uploadedImage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Home
      <div>
        <div>
          <form onSubmit={e => handleSubmit(e)}>
            <label htmlFor="fileInput">Upload your photo here</label>
            <input
              type="file"
              id="fileInput"
              onChange={e => handleChange(e)}
              required
              accept="image/png, image/jpeg, image/jpg, image/jifif"
            />
            <button>Submit</button>
          </form>
          <img src={image} alt="" />
        </div>
        <div>

        <AdvancedImage cldImg={myImage} />

        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
