import React, { useState, useEffect, useRef } from "react";
import "./UserCard.css";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { getMyTasks } from "../../Redux/taskSlice";

const UserCard = ({ ele }) => {
  const dispatch = useDispatch();
  const [userprofile, showUserProfile] = useState(false);
  const profileRef = useRef(null);

  const showUserProfileHandle = (id) => {
    showUserProfile(!userprofile);
    dispatch(getMyTasks(id));
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      showUserProfile(false);
    }
  };

  useEffect(() => {
    if (userprofile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userprofile]);

  return (
    <div className="UserCard-container">
      <div className="UserCard-container-top">
        <img src={ele.avatar.url} />
        <h4>{ele.name}</h4>
        <h6>employer</h6>
      </div>

      
      <button
        onClick={() => showUserProfileHandle(ele._id)}
        className="UserCard-container-button"
      >
        View Profile
      </button>
      {userprofile && (
        <div className="ShowSettingOption">
          <div ref={profileRef}>
            <UserProfile info={ele} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
