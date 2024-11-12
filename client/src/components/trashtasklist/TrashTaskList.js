import React, { useEffect, useState } from "react";
import "./trashTaskList.css";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import DialogBox from "../DialogBox/DialogBox";
import { useSelector, useDispatch } from "react-redux";
import { getMyTasks } from "../../Redux/taskSlice";

const TrashTaskList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (actionType, id) => {
    setType(actionType);
    setOpenDialog(true);
    setSelected(id);
    setMsg("Do you want to permenantly delete this item?");
  };

  const handleTrash = (actionType, id) => {
    setType(actionType);
    setOpenDialog(true);
    setSelected(id);
    setMsg("Do you want to restore the selected item?");
  };

  const handleDeleteAll = (actionType) => {
    setType(actionType);
    setOpenDialog(true);

    setMsg("Do you want to permenantly delete all items?");
  };

  const handlerestoreAll = (actionType) => {
    setType(actionType);
    setOpenDialog(true);
    setMsg("Do you want to restore all items in the trash?");
  };

  useEffect(() => {
    dispatch(getMyTasks(user._id));
  }, [dispatch]);

  let trashedTask = tasks.filter((ele) => ele.isTrashed == true);

  return (
    <div className="trash-list-product">
      <div className="trashed-container-top">
        <h3>Trashed task</h3>
        <div className="trashed-container-top-right">
          <div
            onClick={() => handlerestoreAll("restoreAll")}
            className="trashed-container-top-right-icons"
          >
            <HistoryIcon />
            <h5>restore all</h5>
          </div>

          <div
            onClick={() => handleDeleteAll("deleteAll")}
            className="trashed-container-top-right-icons"
          >
            <DeleteIcon style={{ color: "red" }} />
            <h5 style={{ color: "red" }}>delete all</h5>
          </div>
        </div>
      </div>
      <div className="listproduct-format-mainn">
        <p>Task title</p>
        <p>Priority</p>
        <p>Stage</p>

        <p>Created </p>
        <p></p>
      </div>
      <div className="listproduct-allproducts">
        <hr />

        {trashedTask &&
          trashedTask.map((ele, index) => {
            return (
              <>
                <div
                  key={ele._id}
                  className="listproduct-format-mainn listproduct-format"
                >
                  <p>{ele.title}</p>
                  <p>{ele.priority}</p>
                  <p>{ele.status}</p>
                  <p>{formatDate(ele.createdAt)}</p>

                  <div className="icons">
                    <HistoryIcon
                      onClick={() => handleTrash("restore", ele._id)}
                    />
                    <DeleteIcon
                      onClick={() => handleDelete("delete", ele._id)}
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
                <hr />
              </>
            );
          })}
      </div>

      {openDialog && (
        <div className="deleteCard">
          <DialogBox
            open={openDialog}
            setOpen={setOpenDialog}
            msg={msg}
            setMsg={setMsg}
            type={type}
            setType={setType}
            selected={selected}
          />
        </div>
      )}
    </div>
  );
};

export default TrashTaskList;
