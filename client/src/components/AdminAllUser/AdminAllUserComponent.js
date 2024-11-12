import React, { useEffect, useState } from "react";
import "./AdminAllUserComponent.css";
import GroupIcon from "@mui/icons-material/Group";
import { Circle, Line } from "rc-progress";
import { useSelector, useDispatch } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TaskIcon from "@mui/icons-material/Task";
import { getMyUsers, getUser } from "../../Redux/AdminUserSlice";
import { getAdminTask } from "../../Redux/AdminUserSlice";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import UserCard from "../userCard/UserCard";
import nouser from "../../Assests/uer.webp";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AdminAllUserComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { adminAllUsers } = useSelector((state) => state.admin);
  const [open, setOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const adminId = user?._id;
  const [currentPage, SetcurrentPage] = useState(1);
  const recordedPerPage = 5;
  const lastIndex = currentPage * recordedPerPage;
  const firstIndex = lastIndex - recordedPerPage;
  const records = adminAllUsers.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(adminAllUsers.length / recordedPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://taskmanagement-ep8r.onrender.com/user/allUser");
      setAllUser(response.data.allUser);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    dispatch(getUser({ adminId }));
    dispatch(getAdminTask({ adminId }));
  }, [dispatch, adminId]);


  const showUser = () => {
    setOpen(true);
  };

  const handleUser = async (userId) => {
    const updatedUsers = allUser.map((user) =>
      user._id === userId
        ? { ...user, myAdmin: user.myAdmin ? null : adminId }
        : user
    );

    setAllUser(updatedUsers);
    await dispatch(getMyUsers({ userId, adminId }));
    dispatch(getUser({ adminId }));
    dispatch(getAdminTask({ adminId })); // Fetch updated user list after adding/removing
  };

  function prePage(e) {
    e.preventDefault(); // Prevent default navigation behavior
    if (currentPage > 1) {
      SetcurrentPage(currentPage - 1);
    }
  }

  function changeCPage(e, id) {
    e.preventDefault(); // Prevent default navigation behavior
    SetcurrentPage(id);
  }

  function nextPage(e) {
    e.preventDefault(); // Prevent default navigation behavior
    if (currentPage < nPage) {
      SetcurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="AdminAllUserComponent">
    
      <div className="AdminAllUserComponent-top">
        <div className="alluser-card">
          <div className="alluser-card-top">
            <GroupIcon className="GroupIconnk" />
            <div className="circle">
              <Circle
                percent={adminAllUsers.length}
                strokeWidth={10}
                strokeColor="blue"
                trailColor="red"
                trailWidth={10}
              />
            </div>
          </div>
          <h5>MY TOTAL USERS </h5>
          <h2>{adminAllUsers.length}</h2>
        </div>

        <div onClick={showUser} className="alluser-add-user">
          <PersonAddIcon />
          <h4>Add User</h4>
        </div>
      </div>
      {records.length !== 0 ? (
        <div className="amittt">
          {records &&
            records.map((ele) => <UserCard key={ele._id} ele={ele} />)}
        </div>
      ) : (
        <img src={nouser} alt="No users available" />
      )}

      <div className={open ? "userss" : "userss-none"}>
        <div className="userss-top">
          <div className="userss-top-left">
            <h4>Add User</h4>
            <GroupIcon />
          </div>
          <CloseIcon onClick={() => setOpen(false)} />
        </div>
        <div className="optionss">
          {allUser &&
            allUser.map((ele) => (
              <div className="optionss-box" key={ele._id}>
                <div className="optionss-box-left">
                  <h4>{ele.name}</h4>
                  <h6>{ele.email}</h6>
                </div>
                <div className="optionss-box-right">
                  {ele.myAdmin ? (
                    <button
                      className="remove-button"
                      onClick={() => handleUser(ele._id)}
                    >
                      remove
                    </button>
                  ) : (
                    <button
                      className="add-button"
                      onClick={() => handleUser(ele._id)}
                    >
                      add
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      {records.length !== 0 && (
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>

            {numbers.map((n) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={n}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={(e) => changeCPage(e, n)}
                >
                  {n}
                </a>
              </li>
            ))}

            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default AdminAllUserComponent;