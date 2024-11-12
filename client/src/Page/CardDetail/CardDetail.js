import React, { useEffect, useState } from "react";
import "./CardDetail.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CircleIcon from "@mui/icons-material/Circle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";

const CardDetail = () => {
  const [taskInfo, setaskInfo] = useState({});

  const { id } = useParams();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  useEffect(() => {
    const gettaskInfo = async () => {
      const res = await axios.get(`http://localhost:8000/task/single/${id}`);
      setaskInfo(res.data.task);
    };
    gettaskInfo();
  }, []);

  console.log(taskInfo, "hello");

  return (
    <div className="CardDetail-Container">
      <h2>{taskInfo.title}</h2>
      <div className="CardDetail-Wrapper">
        <p>{taskInfo.description}</p>
        <hr></hr>
        <div className="Details">
          <div className="Details-priority">
            <KeyboardArrowUpIcon />
            <h3
              style={{
                color:
                  taskInfo.priority === "high"
                    ? "red"
                    : taskInfo.priority === "low"
                    ? "pink"
                    : taskInfo.priority === "medium"
                    ? "orange"
                    : "",
              }}
            >
              {taskInfo.priority} priority
            </h3>
          </div>
          <div className="Details-progress">
            <CircleIcon  style={{
                color:
                  taskInfo.status === "completed"
                    ? "green"
                    : taskInfo.status === "incomplete"
                    ? "red"
                    : taskInfo.status === "progress"
                    ? "orange"
                    : "",
              }}/>
            <h3>IN PROGRESS</h3>
          </div>
        
        </div>
        <div className="date-details">
          <div className="task-detail-date">
            <h4>Created At</h4>
            <h4>{formatDate(taskInfo.createdAt)}</h4>
           
          </div>
          <div className="task-detail-date">
          <h4>submitDate</h4>
            <h4>{formatDate(taskInfo.submitDate)}</h4>
           
          </div>

          </div>
      </div>
    </div>
  );
};

export default CardDetail;
