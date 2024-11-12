import React from "react";
import "./DialogBox.css";
import HelpIcon from "@mui/icons-material/Help";
import axios from "axios";
import { getMyTasks } from "../../Redux/taskSlice";
import { useSelector, useDispatch } from "react-redux";

const DialogBox = ({ open, setOpen, msg, selected, type }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const closeDeleteCard = () => {
    setOpen(false);
  };
  const deleteTask = () => {
    setOpen(false)
    const url = `http://localhost:8000/task/delete-restore/${selected}?actionType=${type}`;

    axios.delete(url).then((response) => {
      
        dispatch(getMyTasks(user._id));
      })
      .catch((error) => {
        // Handle error
        console.error(
          "Error:",
          error.response ? error.response.data.message : error.message
        );
      });
  };
  return (
    <div className={open ? "Dialog-CardContainer" : "displayNone"}>
      <div className="Dialog-CardWrapper">
        <HelpIcon 
        
          style={type === "restore" || type === "restoreAll"?{
            width: "90px",
            height: "100px",
            backgroundColor: "orange",
            color: "yellow",
          }: {
            width: "90px",
            height: "100px",
            backgroundColor: "red",
            color: "pink",
          }}

        />
        <p>{msg}</p>
        <div className="DeleteCardButtom">
          <button className="DeleteCardButtomCancel" onClick={closeDeleteCard}>
            cancel
          </button>
          <button className="DeleteCardButtomDelete" style={  type === "restore" || type === "restoreAll"? {backgroundColor :"orange"}:{backgroundColor :"red"}} onClick={deleteTask}>
            {type}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
