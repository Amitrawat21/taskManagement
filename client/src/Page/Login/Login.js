import React, { useState, useEffect } from "react";
import "./Login.css";
import img from "../../Assests/man.jpg";
import { Link, useNavigate , useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice";
import "react-toastify/dist/ReactToastify.css";
import validation from "../../Validation/Validation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getMyTasks } from "../../Redux/taskSlice";

const Login = ({ setAllow }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (isSubmitted) {
      const newFormData = {
        ...formData,
        [name]: value,
      };
      const validationErrors = validation(newFormData, false);
      setErrors(validationErrors);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const validationErrors = validation(formData, false);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8000/user/login",
          formData,
          {
            withCredentials: true,
          }
        );

        if (response.data.success && response.data.user.isAdmin == true) {
          toast.success("signIn successfull!", {
            autoClose: 2000,
            onClose: () => {
              navigate("/AdminDashboard");
              setAllow(true);
              dispatch(login(response.data));
            },
          });
        } else if (response.data.success) {
          toast.success("signIn successfull!", {
            autoClose: 2000,
            onClose: () => {
             navigate("/dashboard");
             window.history.pushState(null, null, '/dashboard');
            
              setAllow(true);
              dispatch(login(response.data));
            },
          });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            toast.error("email not found");
          } else if (error.response.status === 402) {
            toast.error("wrong password");
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {}, []);




  return (
    <div className="loginContainer">
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1000,
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
      <div className="loginWrapper">
        <div className="loginLeft">
          <img src={img} className="leftImg" alt="Login Visual" />
        </div>
        <div className="loginRight">
          <div className="loginRightWrapper">
            <div className="upper">
              <Link to="/signup" className="no-underline">
                <h5>SIGN UP</h5>
              </Link>

              <p>Click here to Signup </p>
            </div>
            <div className="middle">
              <h1>Welcome To Focus !</h1>
              <p>login Your Account</p>
            </div>

            <form className="loginForm" onSubmit={submitForm}>
              <div className="inputs">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                />
                {isSubmitted && errors.email && (
                  <p className="para" style={{ color: "red" }}>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="inputs">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                />
                {isSubmitted && errors.password && (
                  <p className="para" style={{ color: "red" }}>
                    {errors.password}
                  </p>
                )}
              </div>
              <button type="submit" className="loginButton">
                Login In
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Login;
