import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GradeIcon from "@mui/icons-material/Grade";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getMyTasks } from "../../Redux/taskSlice";
import { logout } from "../../Redux/authSlice";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [showSideBar, setShowSideBar] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSectionClick = (type) => {
    setActiveSection(type);
  };

  const Logout = async () => {
    await dispatch(logout());
    navigate("/"); // Navigate to the login page
    window.history.replaceState(null, null, "/"); // Replace the history entry
  };

  const handleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    // Disable the back button
    window.onpopstate = (event) => {
      navigate("/"); // Force redirect to login
    };
  }, [navigate]);

  useEffect(() => {
    if (user) {
      dispatch(getMyTasks(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const path =
      location.pathname.split("/")[2] || location.pathname.split("/")[1]; // Get the second part of the path
    if (path) {
      setActiveSection(path);
    }
  }, [location]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="showSidebar" onClick={handleSidebar}>
        <ExitToAppIcon
          style={{
            width: "50px",
            height: "40px",
            margin: "10x",
            backgroundColor: "gray",
          }}
        />
      </div>
      <div className={showSideBar ? "sidebarContainer" : "noshowSideBar"}>
        <div className="sidebarWrapper">
          <div className="upper">
            <div className="intro">
              <img
                style={{ width: "55px", height: "55px", borderRadius: "35px" }}
                src={user.avatar.url}
              />
              <h2>TaskMe</h2>
            </div>
            <p>{user.email}</p>
          </div>
          <div className="lower">
            <Link className="link" to="/dashboard">
              <div
                className={`section ${
                  activeSection === "dashboard" ? "focused" : ""
                }`}
                onClick={() => handleSectionClick("dashboard")}
                tabIndex={0}
              >
                <DashboardIcon
                  style={{
                    width: "30px",
                    height: "20px",
                    color: "rgb(94, 94, 94)",
                  }}
                />
                <h4>Dashboard</h4>
              </div>
            </Link>
            <Link className="link" to="/task/AllTask">
              <div
                className={`section ${
                  activeSection === "AllTask" ? "focused" : ""
                }`}
                onClick={() => handleSectionClick("AllTask")}
                tabIndex={0}
              >
                <ListAltIcon
                  style={{
                    width: "30px",
                    height: "20px",
                    color: "rgb(94, 94, 94)",
                  }}
                />
                <h4>Tasks</h4>
              </div>
            </Link>
            <Link className="link" to="/AdminAssignTask">
              <div
                className={`section ${
                  activeSection === "AdminAssignTask" ? "focused" : ""
                }`}
                onClick={() => handleSectionClick("AdminAssignTask")}
                tabIndex={0}
              >
                <AdminPanelSettingsIcon
                  style={{
                    width: "30px",
                    height: "20px",
                    color: "rgb(94, 94, 94)",
                  }}
                />
                <h4>AdminAssignTask</h4>
              </div>
            </Link>
            <Link className="link" to="/task/completed">
              <div
                className={`section ${
                  activeSection === "completed" ? "focused" : ""
                }`}
                onClick={() => handleSectionClick("completed")}
                tabIndex={0}
              >
                <TaskAltIcon
                  style={{
                    width: "30px",
                    height: "20px",
                    color: "rgb(94, 94, 94)",
                  }}
                />
                <h4>Completed</h4>
              </div>
            </Link>
            <Link className="link" to="/task/todo">
              <div
                className={`section ${
                  activeSection === "todo" ? "focused" : ""
                }`}
                onClick={() => handleSectionClick("todo")}
                tabIndex={0}
              >
                <AssignmentIndIcon
                  style={{
                    width: "30px",
                    height: "20px",
                    color: "rgb(94, 94, 94)",
                  }}
                />
                <h4>Todo</h4>
              </div>
            </Link>
            <Link className="link" to="/task/progress">
              <div
                className={`section ${
                  activeSection === "progress" ? "focused" : ""
                }`}
                onClick={() => handleSectionClick("progress")}
                tabIndex={0}
              >
                <AssignmentIcon
                  style={{
                    width: "30px",
                    height: "20px",
                    color: "rgb(94, 94, 94)",
                  }}
                />
                <h4>In Progress</h4>
              </div>
            </Link>
            <Link className="link" to="/task/incomplete">
              <div
                className={`section ${
                  activeSection === "incomplete" ? "focused" : ""
                }`}
                onClick={() => handleSectionClick("incomplete")}
                tabIndex={0}
              >
                <AssignmentLateIcon
                  style={{
                    width: "30px",
                    height: "20px",
                    color: "rgb(94, 94, 94)",
                  }}
                />
                <h4>Incomplete</h4>
              </div>
            </Link>
            <Link className="link" to="/task/favourite">
              <div
                className={`section ${
                  activeSection === "favourite" ? "focused" : ""
                }`}
                onClick={() => handleSectionClick("favourite")}
                tabIndex={0}
              >
                <GradeIcon
                  style={{
                    width: "30px",
                    height: "20px",
                    color: "rgb(94, 94, 94)",
                  }}
                />
                <h4>Favourite</h4>
              </div>
            </Link>

            <Link className="link" to="/trashed">
              <div
                className={`section ${
                  activeSection === "trashed" ? "focused" : ""
                }`}
                onClick={() => handleSectionClick("trashed")}
                tabIndex={0}
              >
                <DeleteIcon
                  style={{
                    width: "30px",
                    height: "20px",
                    color: "rgb(94, 94, 94)",
                  }}
                />
                <h4>Trash</h4>
              </div>
            </Link>
            <div
              className={`section ${
                activeSection === "logout" ? "focused" : ""
              }`}
              onClick={() => handleSectionClick("logout")}
              tabIndex={0}
            >
              <LogoutIcon
                style={{
                  width: "30px",
                  height: "20px",
                  color: "rgb(94, 94, 94)",
                }}
              />
              <h4 onClick={Logout}>Logout</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
