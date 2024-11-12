import User from "../Model/userSchema.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

class UserController {
  constructor() {}

  static registration = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("User avatar required");
    }

    const { avatar } = req.files;
    const { name, email, password } = req.body;


    if (!name || !email ||  !password) {
      return res.status(400).send({ message: "Please fill the full form" });
    }

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(403).send({ message: "Email already exists" });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath
      );
    
      if (!cloudinaryResponse) {
        console.error("Unknown cloudinary error!");
        return res.status(500).send({ message: "Avatar upload failed" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
       
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });

    

      return res.status(201).json({
        success: true,
        user: newUser,
        message: "Registration successful",
        token,
      });
      

    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Server error" });
    }
    
    
  };

  static Admin = async (req, res) => {
    const { id } = req.params;
    const { isAdmin } = req.body;
  
    try {
      const user = await User.findById({_id:id});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.isAdmin = isAdmin;
      await user.save();
  
      return res.status(200).json({success:true , message: 'User updated successfully', user });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };
  

  static login = async (req, res) => {
    
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ message: "Please provide email and password!" });
    }
  
    try {
      const user = await User.findOne({ email });
      console.log(user, 'user')
      if (!user) {
        return res.status(403).send({ message: "Invalid email" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(402).send({ message: "Wrong password" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
  
    
      return res.status(201).json({
        success: true,
        user: user,
        message: "Login successful",
        token,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Server error" });
    }
  };

  static isAdminExit = async (req, res) => {
    try {
      const response = await User.find({ isAdmin: true });

      if (response.length >= 1) {
        return res.status(200).json({
          success: true,
          message: "Admin already exists",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "No admin found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };


static logout = async (req, res) => {

    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User Logged Out!",
      });
      const{token} = req.cookies
      console.log(token , "tokennn")
  };

  static  myProfile = async(req, res) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  };


  static addUser = async (req, res) => {
    try {
      const { userId } = req.body;
      const { adminId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
  
      const admin = await User.findById(adminId);
      if (!admin) {
        return res.status(400).json({ message: "Admin not found." });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
  
      const index = admin.myUser.indexOf(userId);
  
      if (index === -1) {
        // User not found, add user
        admin.myUser.push(userId);
        user.myAdmin = adminId;
      } else {
        // User found, remove user
        admin.myUser.splice(index, 1);
        user.myAdmin = null;
      }
  
      await admin.save();
      await user.save();
  
      return res.status(200).json({ message: "User updated successfully." ,allUser:admin.myUser });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error.", error });
    }
  };
  
  static allUser = async (req, res) => {
    try {
      const response = await User.find({ isAdmin: false });
  
      res.status(200).json({ success: true, allUser: response });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error.", error });
    }
  }

 static adminuser = async(req,res)=>{
    try {
      const{adminId}= req.params
      const response = await User.findById({ _id: adminId  }).populate("myUser");;
  
      res.status(200).json({ success: true, myUser: response.myUser });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error.", error });
    }
  } 



  static AdminassignTask = async (req, res) => {
    try {
      const { id, task } = req.body; // id of the user to whom the task is assigned
      const { adminId } = req.params; // id of the admin assigning the task

      console.log(task , id)
  
      // Validate input
      if (!id || !task || !task.task) {
        return res.status(400).json({
          success: false,
          message: "Invalid input: Please provide user id and valid task details.",
        });
      }
  
      // Set default date if not provided
   
  
      // Find the admin user by ID
      const admin = await User.findById({_id: adminId});
  
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }
  
      // Check if the user is already in the adminAssignedTask array
      const existingTaskEntry = admin.adminAssignedTask.find(
        (assignedTask) => assignedTask.User.toString() === id
      );
  
      if (existingTaskEntry) {
        // User already exists, push the new task to their tasks array
        existingTaskEntry.tasks.push(task);
      } else {
        // User doesn't exist, create a new entry with the task
        admin.adminAssignedTask.push({ User: id, tasks: [task] });
      }
  
      // Save the updated admin document
      await admin.save();
  
      return res.status(200).json({
        success: true,
        message: "Task assigned successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  


    static Getadminassigntask = async (req, res) => {
      try {
        const { userId } = req.params;
  
        // Find the user by ID and populate the myAdmin field
        const response = await User.findById(userId).populate("myAdmin");
  
        if (!response) {
          return res.status(404).json({ success: false, message: "User not found." });
        }
  
        // Filter the adminAssignedTask array to get only the tasks assigned to the user
        const adminAssignedTasks = response.myAdmin.adminAssignedTask.filter(
          (task) => task.User.toString() === userId
        );
  
        res.status(200).json({ success: true, adminAssignedTasks });
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error.", error });
      }
    };

    static DeleteassignTask = async (req, res) => {
      try {
        const { adminId, userId, taskId } = req.body;
    
        // Find the admin by their ID
        const admin = await User.findById({ _id: adminId });
    
        // Check if admin exists
        if (!admin) {
          return res.status(404).json({ message: "Admin not found" });
        }
    
        // Find the object in adminAssignedTask where the userId matches
        const assignedTask = admin.adminAssignedTask.find(task => task.User.toString() === userId);
    
        // Check if assigned task object exists
        if (!assignedTask) {
          return res.status(404).json({ message: "Assigned task not found" });
        }
    
        // Find the index of the specific task to delete within the tasks array
        const taskIndex = assignedTask.tasks.findIndex(task => task._id.toString() === taskId);
    
        // Check if task exists
        if (taskIndex === -1) {
          return res.status(404).json({ message: "Task not found" });
        }
    
        // Remove the task from the tasks array
        assignedTask.tasks.splice(taskIndex, 1);
    
        // Save the admin document with the updated adminAssignedTask list
        await admin.save();
    
        return res.status(200).json({success :true, message: "Task deleted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
      }
    };
    
    
  }
  


  
  


export default UserController;
