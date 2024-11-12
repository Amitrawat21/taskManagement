import React, { useEffect, useState } from "react";
import "./Card.css";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircleIcon from "@mui/icons-material/Circle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";
import CardSetting from "../CardSetting/CardSetting";

const Card = ({ item, activeCardId, setActiveCardId, amit }) => {
  const { status } = useParams();
  const [favourites, setFavourites] = useState(item.favourite);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const time = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentDate = new Date();
    const timeDifference = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)); // Difference in days
    const startTimeDifference = Math.ceil((startDate - currentDate) / (1000 * 60 * 60 * 24)); // Difference in days

  const isSameDay = (
    currentDate.getFullYear() === endDate.getFullYear() &&
    currentDate.getMonth() === endDate.getMonth() &&
    currentDate.getDate() === endDate.getDate()
  );




    if (timeDifference > 0.1  && startTimeDifference <1 ) {
      return `You have only ${timeDifference} days left`;
    }
      else if(startTimeDifference > 1){
        return `You have to start your task after ${startTimeDifference} `;

      }
     else if (isSameDay) {
      return "You have to submit today";
    } else {
      return "You have not submitted yet";
    }
  };

  const showSetting = () => {
    if (activeCardId === item._id) {
      setActiveCardId(null);
    } else {
      setActiveCardId(item._id);
    }
  };

  const setFavourite = async () => {
    const response = await axios.put(
      `http://localhost:8000/task/favourite/${item._id}`
    );

    if (response.status === 200) {
      const newFavouriteStatus = response.data.task.favourite;
      setFavourites(newFavouriteStatus);
      amit(newFavouriteStatus, item._id);
    }
  };

  return (
    <div className="cardContainer">
      <div className="cardWrapper">
        <div className="cardWrapperTop">
          <div className="priority">
            <KeyboardDoubleArrowUpIcon
            className="KeyboardDoubleArrowUpIcon"
              style={{
                color:
                  item.priority === "high"
                    ? "red"
                    : item.priority === "low"
                    ? "pink"
                    : item.priority === "medium"
                    ? "orange"
                    : "",
              }}
            />
            <h5
              style={{
                color:
                  item.priority === "high"
                    ? "red"
                    : item.priority === "low"
                    ? "pink"
                    : item.priority === "medium"
                    ? "orange"
                    : "",
              }}
            >
              {item.priority === "high"
                ? "HIGH PRIORITY"
                : item.priority === "low"
                ? "LOW PRIORITY"
                : item.priority === "medium"
                ? "MEDIUM PRIORITY"
                : ""}
            </h5>
          </div>
          <MoreHorizIcon className="MoreHorizIcon" onClick={showSetting} />
        </div>
        <div className="cardWrappermid">
          <div className="task-title">
            <CircleIcon 
            className="CircleIcon"
              style={{
                color:
                  item.status === "completed"
                    ? "green"
                    : item.status === "incomplete"
                    ? "red"
                    : item.status === "progress"
                    ? "orange"
                    : item.status === "todo"
                    ? "blue"
                    :"" ,
              }}
            />

            <h2>{item.title}</h2>
          </div>
          <p>{item.description}</p>
          <div className="task-date"> 
            <h5>{formatDate(item.createdAt)}</h5>
            <CalendarMonthIcon style={{ color: "green" }}  className="CalendarMonthIconn"/>
          </div>
          <div className="task-date">
            <h5>{formatDate(item.submitDate)}</h5>
            <EventIcon style={{ color: "red" }}  className="CalendarMonthIconn" />
          </div>
        </div>
        <div className="cardWrapperBottom">
        <h4>
  {item.status === 'completed' ? time(item.createdAt, item.submitDate) === "You have not submitted yet"? 'late submission': 'task completed' : time(item.createdAt, item.submitDate) } 
</h4>

          <button
            onClick={setFavourite}
            disabled={status === "favourite"}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: favourites ? "default" : "pointer",
            }}
          >
            <StarIcon style={{ color: favourites ? "#FFD700" : "#E6E6FA" }} className="StarIcon" />
          </button>
        </div>
      </div>
      {activeCardId === item._id && (
        <div className="showSettingOption">
          <CardSetting
            id={item._id}
            item={item}
            setActiveCardId={setActiveCardId}
            selector='cardWrapper'
          />
        </div>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Card;
