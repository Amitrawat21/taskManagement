import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskIcon from "@mui/icons-material/Task";
import StarsIcon from "@mui/icons-material/Stars";

import TaskList from "../../components/TaskLIst/TaskList";
import { getMyTasks } from "../../Redux/taskSlice";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.task);
  const [chartSize, setChartSize] = useState({ width: 500, height: 300 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 500) {
        setChartSize({ width: screenWidth - 30, height: 200 });
      } else if (screenWidth <= 800) {
        setChartSize({ width: screenWidth - 50, height: 250 });
      } else {
        setChartSize({ width: 800, height: 300 });
      }
    };

    // Initial size setting
    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(getMyTasks());
  }, [dispatch]);

  const incompleteTasks = tasks.filter((task) => task.status === "incomplete");
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const progressTasks = tasks.filter((task) => task.status === "progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const data = [
    { name: "Completed", tasks: completedTasks.length, fill: "#4caf50" },
    { name: "Incomplete", tasks: incompleteTasks.length, fill: "#f44336" },
    { name: "Todo", tasks: todoTasks.length, fill: "#2196f3" },
    { name: "In Progress", tasks: progressTasks.length, fill: "orange" },
  ];

  useEffect(() => {
    const handlePopState = () => {
      navigate("/dashboard");
    };

    window.onpopstate = handlePopState;

    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

  return (
    <div className="dashboardContainer">
      <div className="dashboardWrapper">
        <div className="warpperTop">
          <div className="box">
            <div className="box-info">
              <h5>TODO TASKS</h5>
              <h4>{todoTasks.length}</h4>
            
            </div>
            <ListAltIcon style={{ backgroundColor: "blue", color: "white" }} className="boxx" />
          </div>
          <div className="box">
            <div className="box-info">
              <h5>COMPLETED TASKS</h5>
              <h4>{completedTasks.length}</h4>
          
            </div>
            <TaskIcon style={{ backgroundColor: "green", color: "white" }} />
          </div>
          <div className="box">
            <div className="box-info">
              <h5>INCOMPLETE TASKS</h5>
              <h4>{incompleteTasks.length}</h4>
          
            </div>
            <ListAltIcon style={{ backgroundColor: "red", color: "white" }} />
          </div>
          <div className="box">
            <div className="box-info">
              <h5>IN PROGRESS TASKS</h5>
              <h4>{progressTasks.length}</h4>
             
            </div>
            <StarsIcon style={{ backgroundColor: "orange", color: "white" }} />
          </div>
        </div>
        <div className="wrapperMid">
          <BarChart
            width={chartSize.width}
            height={chartSize.height}
            data={data}
          
            barSize={chartSize.width / data.length - 10}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="tasks" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </div>
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;



