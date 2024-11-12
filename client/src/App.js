import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import AdditionalInfo from "./Page/AddiionalInfo/AdditionalInfo";
import Dashboard from "./Page/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Task from "./Page/Task/Task";
import CardDetail from "./Page/CardDetail/CardDetail";
import Trashed from "./Page/Trashed/Trashed";
import AdminSideBar from "./components/AdminSideBar/AdminSideBar";
import AdminDashBoard from "./Page/AdminDashboard/AdminDashBoard";
import AdminUser from "./Page/Adminuser/AdminUser";
import MyAdminAssignTask from "./Page/MyAdminaAssignTask/MyAdminAssignTask";


function App() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);
  const[allow , setAllow] = useState(false || user)

  useEffect(() => {
    if (user && allow && location.pathname !== '/' && location.pathname !=="/signup") {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [user, allow, location.pathname]);

  return (
 
      <div className="app-container">
{user && user.isAdmin === false ? (
        showSidebar && <Sidebar className="sidebar" />
      ) : (
        user && showSidebar && <AdminSideBar />
      )}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login setAllow={setAllow} />} />
            <Route path="/signup" element={<Register  setAllow={setAllow} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/task/AllTask" element={<Task/>} />
            <Route path="/task/:status" element={<Task/>} />
            <Route path="/Card/:id" element={<CardDetail/>} />
            <Route path="/trashed" element={<Trashed/>} />
            <Route path="/AdditionalInfo" element={<AdditionalInfo/>} />
            <Route path="/AdminDashboard" element={<AdminDashBoard/>} />
            <Route path="/AdminUser" element={<AdminUser/>} />
            <Route path="/AdminAssignTask" element={<MyAdminAssignTask/>} />
          </Routes>
        </div>
      </div>
 
  );
}

export default App;
