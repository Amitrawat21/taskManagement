import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Line } from "rc-progress";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = ({ info }) => {
  const [assigntsk, setAssinTask] = useState("");
  const { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [show, setshow] = useState("myTask");
  const [showSend, Setshowsend] = useState(false);

  const totalTask = (Status) => {
    return tasks.filter((ele) => ele.status === Status).length;
  };

  const handleSendMesage = () => {
    Setshowsend(!showSend);
  };

  const SendTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/user/adminAssignTask/${user._id}`,
        {
          id: id,
          task: {
            task: assigntsk,
            date: new Date(), 
          },
        }
      );

      if (response.data.success) {
        setAssinTask("");
        Setshowsend(false);
        toast.success("Task successfully sent");
      }
    } catch (err) {
      toast.error("Failed to send task. Please try again.");
    }
  };

  const getDataa = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user/Getadminassigntask/${info._id}`
      );
      setData(response.data.adminAssignedTasks);
    } catch (err) {
      toast.error("Failed to fetch assigned tasks.");
    }
  };

  useEffect(() => {
    getDataa();
  }, [assigntsk]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/user/deleteAssignTask",
        {
          adminId: user._id,
          userId: info._id,
          taskId: id,
        }
      );

      if (response.data.success) {
        toast.success("Assigned task deleted successfully");
        getDataa();
      }
    } catch (err) {
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log(data[0]?.tasks, "kkkkk");

  return (
    <div className="UserProfil-container">
      <h3>User Profile</h3>
      <div className="UserProfil-container-mid">
        <div className="UserProfil-container-mid-left">
          <img src={info.avatar.url} alt="User Avatar" />
          <h2>{info.name}</h2>

          <div className="line">
            <Line
              percent={totalTask("completed")}
              strokeColor="red"
              strokeWidth={5}
              trailColor="blue"
              trailWidth={5}
              strokeLinecap="square"
            />
          </div>
          <span>Complete Task</span>
        </div>
        <div className="UserCard-container-mid">
          <div className="info">
            <h3 style={{ color: "green" }}>{totalTask("completed")}</h3>
            <h4 style={{ color: "green" }}>Complete</h4>
          </div>
          <div className="info">
            <h3 style={{ color: "red" }}>{totalTask("incomplete")}</h3>
            <h4 style={{ color: "red" }}>Incomplete</h4>
          </div>
          <div className="info">
            <h3 style={{ color: "orange" }}>{totalTask("progress")}</h3>
            <h4 style={{ color: "orange" }}>Progress</h4>
          </div>
        </div>
        <div className="UserProfil-container-mid-right">
          <button onClick={handleSendMesage}>Assign Task</button>
        </div>
      </div>

      <div className="taskssShowOption">
        <h3
          className={show === "myTask" ? "lopp" : "lop"}
          onClick={() => setshow("myTask")}
        >
          User All Task List
        </h3>
        <h3
          className={show === "assigned task" ? "lopp" : "lop"}
          onClick={() => setshow("assigned task")}
        >
          Assigned Task
        </h3>
      </div>

      {show === "myTask" ? (
        <div className="aaa">
          {tasks.length === 0 ? (
            <h1>No tasks right now</h1>
          ) : (
            <>
              <div className="listproduct-format-main">
                <p>Task Title</p>
                <p>Priority</p>
                <p>Created At</p>
                <p>Submit Date</p>
                <p>Status</p>
              </div>
              <div className="listproduct-allproductask">
                <hr />
                {tasks.map((ele) => (
                  <React.Fragment key={ele._id}>
                    <div className="listproduct-format-main listproduct-format">
                      <p className="titlee">{ele.title}</p>
                      <p className="priority">{ele.priority}</p>
                      <p className="createdat">{formatDate(ele.createdAt)}</p>
                      <p className="createdat">{formatDate(ele.submitDate)}</p>
                      <p
                        style={{
                          color:
                            ele.status === "completed"
                              ? "green"
                              : ele.status === "incomplete"
                              ? "red"
                              : ele.status === "progress"
                              ? "orange"
                              : "blue",
                        }}
                      >
                        {ele.status}
                      </p>
                    </div>
                    <hr />
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="aaa">
          {!data[0]?.tasks || data[0]?.tasks.length === 0 ? (
            <h1>No assigned tasks right now</h1>
          ) : (
            <>
              <div className="listproduct-format-main-bottom">
                <p>No</p>
                <p>Task</p>
                <p>AssignedDate</p>
                <DeleteIcon style={{ color: "red" }} />
              </div>
              <div className="listproduct-allproductask">
                <hr />
                {data[0]?.tasks.map((ele, index) => (
                  <React.Fragment key={ele._id}>
                    <div className="listproduct-format-main-bottom listproduct-format">
                      <p className="titlee">{index + 1}</p>
                      <p style={{ maxWidth: "300px" }} className="priority">
                        {ele.task}
                      </p>
                      <p className="createdat">{formatDate(ele.date)}</p>
                      <p
                        style={{
                          borderRadius: "5px",
                          padding: "4px",
                          color: "white",
                          backgroundColor: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(ele._id)}
                      >
                        Delete
                      </p>
                    </div>
                    <hr />
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {showSend && (
        <div className="sendTask">
          <input
            style={{
              border: "none",
              height: "30px",
              width: "350px",
              padding: "4px 8px",
            }}
            type="text"
            value={assigntsk}
            onChange={(e) => setAssinTask(e.target.value)}
          />
          <SendIcon onClick={() => SendTask(info._id)} />
        </div>
      )}

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default UserProfile;
