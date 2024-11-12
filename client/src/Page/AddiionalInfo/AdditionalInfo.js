import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdditionalInfo.css";
import admin from "../../Assests/admin.png";
import userImage from "../../Assests/user2.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/authSlice";

const AdditionalInfo = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = location.state?.data;

  const choseAdmin = async (item) => {
    setIsAdmin(item);
    try {
      const response = await axios.put(
        `http://localhost:8000/user/admin/${data.user._id}`,
        { isAdmin: item }
      );

      if (response.data.success) {
        const updatedUser = { ...data.user, isAdmin: item };
        dispatch(register({ ...data, user: updatedUser }));
        if (item) {
          navigate("/AdminDashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error updating admin status", error);
    }
  };

  return (
    <div className="AdditionalInfoo">
      <div className="AdditionalInfo-wrapper">
        <h1>Choose One</h1>
        <div className="type-option">
          <img onClick={() => choseAdmin(true)} src={admin} alt="Admin" />
          <img onClick={() => choseAdmin(false)} className="users" src={userImage} alt="User" />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
