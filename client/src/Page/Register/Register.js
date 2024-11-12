import React, { useEffect, useState } from "react";
import "./Register.css";
import img from "../../Assests/man.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validation from "../../Validation/Validation";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Register = ({ setAllow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [adminExit, setAdminExit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

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
      const validationErrors = validation(newFormData, avatar, true);
      setErrors(validationErrors);
    }
  };

  const adminexit = async () => {
    const response = await axios.get("http://localhost:8000/user/adminExit");
    setAdminExit(response.data.success);
  };

  useEffect(() => {
    adminexit();
  }, []);

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));

    if (isSubmitted) {
      const validationErrors = validation(formData, file, true);
      setErrors(validationErrors);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const validationErrors = validation(formData, avatar, true);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("avatar", avatar);

      try {
        const response = await axios.post(
          "http://localhost:8000/user/register",
          data,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.data.success) {
          if (adminExit == true) {
            toast.success("Registration successful", {
              autoClose: 2000,
              onClose: () => {
                navigate("/dashboard");
         
                setAllow(true)
                dispatch(register(response.data));
              },
            });
          }
          else{
            toast.success("Registration successful", {
              autoClose: 2000,
              onClose: () => {
                navigate("/AdditionalInfo", {
                  state: {
                    data: response.data,
                  },
                });
              },
            });

          }
        
          setFormData({
            name: "",
            email: "",
            password: "",
          });
          setAvatar(null);
        } else {
          toast.error("Sign up failed!");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            toast.error("Email is already in use");
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };




  return (
    <div className="registerContainer">
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
      <div className="registerWrapper">
        <div className="registerLeft">
          <img src={img} className="leftImg" alt="Login Visual" />
        </div>
        <div className="registerRight">
          <div className="registerRightWrapper">
            <div className="upper">
              <Link to="/" className="no-underline">
                <h5>SIGN IN</h5>
              </Link>
              <p>Already Have An Account?</p>
            </div>
            <div className="middle">
              <h1>Welcome To Focus!</h1>
              <p>Register Your Account</p>
            </div>
            <form className="registerForm" onSubmit={submitForm}>
              <div className="inputs">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                />
                {isSubmitted && errors.name && (
                  <p className="para" style={{ color: "red" }}>
                    {errors.name}
                  </p>
                )}
              </div>
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
              <div className="inputs">
                <span>Upload Photo</span>
                <input type="file" onChange={avatarHandler} />

                {isSubmitted && errors.avatar && (
                  <p className="para" style={{ color: "red" }}>
                    {errors.avatar}
                  </p>
                )}
              </div>
              <button type="submit" className="registerButton">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Register;
