import React, { useState, useEffect } from "react";
import "./AdminSidebar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../Redux/authSlice";
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const AdminSideBar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const[showSideBar , setShowSideBar] = useState(true)
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSectionClick = (type) => {
    setActiveSection(type);
  };

  const Logout = async () => {
    await dispatch(logout());
    navigate("/");
    window.history.replaceState(null, null, "/"); 

  };

  
  const handleSidebar = ()=>{
    setShowSideBar(!showSideBar)
  }

  useEffect(() => {
    // Disable the back button
    window.onpopstate = (event) => {
      navigate("/"); // Force redirect to login
    };
  }, [navigate]);

  useEffect(() => {
    const path =
      location.pathname.split("/")[2] || location.pathname.split("/")[1]; // Get the second part of the path
    if (path) {
      setActiveSection(path);
    }
  }, [location]);






  return (
    <>
       <div className="showSidebar" onClick={handleSidebar}>
<ExitToAppIcon style={{width:"50px", height:"40px", margin:"10x" , backgroundColor:"gray"}}/>
    </div>
    <div className= {showSideBar?"sidebarContainer-admin":"noshowSideBar"}>
      <div className="sidebarWrapper-admin">
        <div className="upper-admin">
          <div className="intro-admin">
            <AdminPanelSettingsIcon
              style={{ color: "yellow", backgroundColor: "orange" }}
            />
            <h2>Admin</h2>
          </div>
          <p>{user.email}</p>
        </div>
        <div className="lower-admin">
          <Link className="link-admin" to="/AdminDashboard">
            <div
              className={`section-admin ${
                activeSection === "AdminDashboard" ? "focused-admin" : ""
              }`}
              onClick={() => handleSectionClick("AdminDashboard")}
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
          <Link className="link-admin" to="/AdminUser">
            <div
              className={`section-admin ${
                activeSection === "AdminUser" ? "focused-admin" : ""
              }`}
              onClick={() => handleSectionClick("AdminUser")}
              tabIndex={0}
            >
              <GroupIcon
                style={{
                  width: "30px",
                  height: "20px",
                  color: "rgb(94, 94, 94)",
                }}
              />
              <h4>All Users</h4>
            </div>
          </Link>

          <div
            className={`section-admin ${activeSection === "logout" ? "focused-admin" : ""}`}
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

export default AdminSideBar;
