
import './AdminDashBoard.css'
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboardcomponent from '../../components/AdminDashboardcomponent/AdminDashboardcomponent'
const AdminDashBoard = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const handlePopState = () => {
      navigate("/AdminDashboard");
    };

    window.onpopstate = handlePopState;

    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

  return (
    <div className='admin-dashboard'>
    <AdminDashboardcomponent/>
    </div>
  )
}

export default AdminDashBoard