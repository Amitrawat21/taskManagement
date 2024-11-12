import React from "react";
import "./TaskList.css";
import { useSelector } from "react-redux";

const TaskList = () => {
  const { tasks } = useSelector((state) => state.task);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="list-productk">
      <h3>All Task list</h3>
      <div className="listproduct-format-maink">
        <p>Task title</p>
        <p>Priority</p>
        <p>createdAt</p>
     
      </div>
      <div className="listproduct-allproductsk">
        <hr />

        {tasks &&
          tasks.map((ele , index) => {
            return (
              <>
                <div key={ele._id} className="listproduct-format-maink listproduct-formatk">
                  <p>{ele.title}</p>
                  <p>{ele.priority}</p>
                  <p>{formatDate(ele.createdAt)}</p>
                </div>
                <hr />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default TaskList;
