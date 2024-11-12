import React, { useState, useEffect } from "react";
import "./Task.css";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import Card from "../../components/Card/Card";
import CreateTaskCard from "../../components/CreateTaskCard/CreateTaskCard";
import { useParams } from "react-router-dom";
import { getMyTasks } from "../../Redux/taskSlice";

const Task = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const { status } = useParams();
  let { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  



  const filterTasks = (searchTerm = "", status) => {
    let filtered = tasks.filter((task) => task.isTrashed !== true);
    

    if (status && status !== "favourite") {
      filtered = tasks.filter((task) => task.status === status && task.isTrashed !== true);
    } else if (status === "favourite") {
      filtered = tasks.filter((task) => task.favourite === true && task.isTrashed !== true);
     
    }

    if (searchTerm !== "") {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredTasks(filtered);
    
  };

 


  const searchFunction = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterTasks(searchTerm, status , tasks);
  };

  const addTask = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (status === "favourite" || "AllTask") {
      dispatch(getMyTasks(user?._id));
    
    }
  }, [status, dispatch ]);

  

  useEffect(() => {
    filterTasks("", status);
    
  }, [status, tasks]);


  function amit(favourite , id){
    // if(status == "favourite")
    // setFilteredTasks((prev)=>prev.filter((ele)=>ele._id !== id))

  }





  return (
    <div className="taskContainer">
      <div className="taskWrapper">
        <div className="taskWrapperTop">
          <h2>Tasks</h2>
          <div
            onClick={addTask}
            className={
              status === undefined ? "taskWrapperTopRight" : "closedTask"
            }
          >
            <AddIcon />
            <h5>Create Task</h5>
          </div>
        </div>
        <div className="taskWrapperSearch">
          <SearchIcon />
          <input
            type="text"
            placeholder="search task"
            onChange={searchFunction}
          />
        </div>
        <div className="taskWrapperSign">
          <div className="signCircle">
            <CircleIcon style={{ width: "17px", color: "green" }} />
            <h5>complete</h5>
          </div>
          <div className="signCircle">
            <CircleIcon style={{ width: "17px", color: "orange" }} />
            <h5>progress</h5>
          </div>
          <div className="signCircle">
            <CircleIcon style={{ width: "17px", color: "red" }} />
            <h5>incomplete</h5>
          </div>
        </div>
        <div className="allTask">
          {filteredTasks &&
            filteredTasks.map((item) => (
              <Card
                key={item._id}
                item={item}
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                amit = {amit}
              
              />
            ))}
        </div>
      </div>
      {open && (
        <div className="createTaskOverlay">
          <CreateTaskCard open={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  );
};

export default Task;
