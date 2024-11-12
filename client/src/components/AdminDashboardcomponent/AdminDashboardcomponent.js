import React, { useEffect, useState } from "react";
import { Circle } from "rc-progress";
import { useSelector, useDispatch } from "react-redux";
import "./AdminDashboardcomponent.css";
import TaskIcon from "@mui/icons-material/Task";
import { getAdminTask } from "../../Redux/AdminUserSlice";
import CloseIcon from '@mui/icons-material/Close';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { colors } from "@mui/material";

const AdminDashboardcomponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { adminAllUsers } = useSelector((state) => state.admin);
  const { adminAllTask } = useSelector((state) => state.admin);
  const [chartDimensions, setChartDimensions] = useState({
    pieWidth: 9000,
    pieHeight: 350,
    barWidth: 500,
    barHeight: 360,
  });
  const adminId = user?._id;

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const completeTask = adminAllTask.filter((ele) => ele.status == "completed");
  const IncompleteTask = adminAllTask.filter(
    (ele) => ele.status == "incomplete"
  );
  const progressTask = adminAllTask.filter((ele) => ele.status == "progress");
  const todoTask = adminAllTask.filter((ele) => ele.status == "todo");

  function amit(arr, status) {
    const today = new Date();

    const Tasks = arr.filter(
      (ele) =>
        ele.submitDateByUser &&
        ele.submitDateByUser.date &&
        isSameDay(new Date(ele.submitDateByUser.date), today) &&
        ele.submitDateByUser.status === status
    );

    return Tasks.length;
  }

  const data = [
    { name: "Incomplete", users: IncompleteTask.length, color: "red" },
    { name: "Complete", users: completeTask.length, color: "green" },
    { name: "Progress", users: progressTask.length, color: "orange" },
    { name: "Todo", users: todoTask.length, color: "blue" },
  ];

  const data1 = [
    {
      name: "complete",
      todayTaskstatic: amit(completeTask, "completed"),
      fill: "green",
    },
    { name: "todo", todayTaskstatic: amit(todoTask, "todo"), fill: "blue" },
    {
      name: "progress",
      todayTaskstatic: amit(progressTask, "progress"),
      fill: "orange",
    },
    {
      name: "incomplete",
      todayTaskstatic: amit(IncompleteTask, "incomplete"),
      fill: "red",
    },
  ];

  useEffect(() => {
   
    dispatch(getAdminTask({ adminId }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setChartDimensions({
          pieWidth: 300,
          pieHeight: 200,
          barWidth: 300,
          barHeight: 200,
        });
      } else {
        setChartDimensions({
          pieWidth: 1000,
          pieHeight: 350,
          barWidth: 500,
          barHeight: 360,
        });
      }
    };

    handleResize(); // Set initial dimensions
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="AdminDashboardcomponent-container">
      <h2>Dashboard</h2>

      <div className="cards">
        <div className="card">
          <div className="card-top">
            <TaskIcon 
              style={{   color: "blue" }}
                className="iconsss"
            
            />
            <div className="circle">
              <Circle
                percent={adminAllUsers.length}
                strokeWidth={10}
                strokeColor="blue"
                trailColor="red"
                trailWidth={10}
              />
            </div>
          </div>
          <h6>MY ALL USERS TODO TASK</h6>
          <h2>{todoTask.length}</h2>
        </div>

        <div className="card">
          <div className="card-top">
            <TaskIcon
              style={{  color: "green" }}
               className="iconsss"
            />
            <div className="circle">
              <Circle
                percent={completeTask.length}
                strokeWidth={10}
                strokeColor="green"
                trailColor="red"
                trailWidth={10}
              />
            </div>
          </div>
          <h6> MY ALL USERS COMPLETE TASK</h6>
          <h2>{completeTask.length}</h2>
        </div>

        <div className="card">
          <div className="card-top">
            <TaskIcon
              style={{  color: "orange" }}
               className="iconsss"
            />
            <div className="circle">
              <Circle
                percent={progressTask.length}
                strokeWidth={10}
                strokeColor="orange"
                trailColor="red"
                trailWidth={10}
              />
            </div>
          </div>
          <h6> MY ALL USERS PROGRESS TASK</h6>
          <h2>{progressTask.length}</h2>
        </div>

        <div className="card">
          <div className="card-top">
            <TaskIcon style={{  color: "red" }}   className="iconsss"/>
            <div className="circle">
              <Circle
                percent={IncompleteTask.length}
                strokeWidth={10}
                strokeColor="green"
                trailColor="red"
                trailWidth={10}
              />
            </div>
          </div>
          <h6> MY ALL USERS INCOMPLETE TASK</h6>
          <h2>{IncompleteTask.length}</h2>
        </div>
      </div>
      <div className="all-charts">
        <div className="piechart">
          <PieChart  width={chartDimensions.pieWidth}
            height={350}>
            <Pie
              dataKey="users"
              isAnimationActive={false}
              data={data}
              cx={160}
              cy={180}
              outerRadius={130}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="barCharts">
          <BarChart
         
            height={360}

            width={chartDimensions.barWidth}
       
            data={data1}
            margin={{
              top: 79,
              right: 30,
              left: 40,
            }}
            barSize={15}
             
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="todayTaskstatic"
              fill="#8884d8"
              background={{ fill: "#eee" }}

            />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardcomponent;
