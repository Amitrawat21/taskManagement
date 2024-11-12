import React, { useState } from "react";
import "./CreateTask.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMyTasks } from "../../Redux/taskSlice";
import ChatGtpCard from "../ChatGtpCard/ChatGtpCard";

const CreateTaskCard = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const[showGtp , setshowGtp] = useState(false)
  const { user } = useSelector((state) => state.auth);

  const [taskCreate, setTaskCreate] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    createdAt: "",
    submitDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskCreate((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/task/create",
        { ...taskCreate, createdBy: user._id },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
      
        toast.success("create task  successfully!", {
          autoClose: 2000,
          onClose: () => {
            setOpen(false);
            dispatch(getMyTasks(user._id));
           
          },
        });

        setTaskCreate({
          title: "",
          description: "",
          status: "",
          priority: "",
          createdAt: "",
          submitDate: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showChatGtp = () =>{
    setshowGtp(!showGtp)
  }

  return (
    <div className={open ? "CreateTaskCard_container" : "closed"}>
      <div className="CreateTaskCard_wrapper">
        <div className="top">
          <h4>ADD TASK</h4>
          <div className="top-right" onClick={showChatGtp}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/558/808/original/openai-chatgpt-logo-icon-free-png.png"
              alt="Bot"
            />
            <h4>chat gtp</h4>
          </div>
        </div>

        <form className="createTaskCard-form" onSubmit={handleSubmit}>
          <div className="input">
            <h5>Task Title</h5>
            <input
              type="text"
              name="title"
              value={taskCreate.title}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <h5>Task Description</h5>
            <input
              type="text"
              name="description"
              value={taskCreate.description}
              onChange={handleChange}
            />
          </div>
          <div className="taskDate">
            <div className="input">
              <h5>Start Date</h5>
              <input
                type="date"
                name="createdAt"
                value={taskCreate.createdAt}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <h5>Submit Date</h5>
              <input
                type="date"
                name="submitDate"
                value={taskCreate.submitDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="taskStage">
            <div className="input">
              <h5>Task Stage</h5>
              <select
                name="status"
                value={taskCreate.status}
                onChange={handleChange}
                className="select-dropdown"
              >
                <option value="">Select Status</option>
                <option value="progress">In Progress</option>
                <option value="incomplete">In Complete</option>
                <option value="completed">Completed</option>
                <option value="todo">Todo</option>
              </select>
            </div>
            <div className="input">
              <h5>Priority Level</h5>
              <select
                name="priority"
                value={taskCreate.priority}
                onChange={handleChange}
                className="select-dropdown"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="submitTask">
            <button type="submit" className="sumitTask-Button">
              Submit
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cancel-Button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} />
      <div className="ChatGtpCard">
      <ChatGtpCard showGtp = {showGtp} setshowGtp = {setshowGtp}/>
      </div>
     
    </div>
  );
};

export default CreateTaskCard;
