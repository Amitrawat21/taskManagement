import Task from "../Model/taskSchema.js";
import User from "../Model/userSchema.js";

class taskController {
  constructor() {}

  static createTask = async (req, res) => {
    try {
      const {
        title,
        description,
        status,
        priority,
        createdBy,
        createdAt,
        submitDate,
      } = req.body;

      if (
        !title &&
        !description &&
        !status &&
        !priority &&
        !createdAt &&
        !submitDate
      ) {
        return res
          .status(400)
          .json({ message: "Title and description are required" });
      }

      const task = new Task({
        title,
        description,
        createdBy,
        status,
        priority,
        createdAt,
        submitDate,
      });

      const savedTask = await task.save();

      return res.status(200).json({
        success: true,
        task: savedTask,
        message: "Task Created",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  static deleteTask = async (req, res) => {
    try {
      const { id } = req.params;

      const task = await Task.findByIdAndDelete(id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Task Deleted!",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({
        success: false,
        message: "Server error, please try again later",
      });
    }
  };

  static updateTask = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Task ID is required" });
      }

      const updates = req.body;
      console.log(req.body, "Kkk");
      const task = await Task.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
        
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({
        success: true,
        message: "Task Updated!",
        task,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  static getMyTask = async (req, res) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      const tasks = await Task.find({ createdBy: userId });

      if (!tasks) {
        return res.status(404).json({
          success: false,
          message: "No tasks found for this user",
        });
      }

      return res.status(200).json({
        success: true,
        tasks,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({
        success: false,
        message: "Server error, please try again later",
      });
    }
  };

  static getSingleTask = async (req, res, next) => {
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
      return res.status(400).jso({ message: "Task not found!" });
    }
    res.status(200).json({
      success: true,
      task,
    });
  };

  static setFavouriteTask = async (req, res) => {
    try {
      const { id } = req.params;

      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ message: "Task not found!" });
      }

      task.favourite = !task.favourite;

      await task.save();

      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  };

  static trashTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const task = await Task.findById(id);
  
      task.isTrashed = true;
  
      await task.save();
  
      res.status(200).json({
        status: true,
        message: `Task trashed successfully.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };

  static deleteRestoreTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { actionType } = req.query;

      if (!actionType) {
        return res.status(400).json({ status: false, message: "Action type is required." });
      }

      switch (actionType) {
        case "delete":
          if (!id) {
            return res.status(400).json({ status: false, message: "Task ID is required for delete action." });
          }
          const deleteResult = await Task.findByIdAndDelete(id);
          if (!deleteResult) {
            return res.status(404).json({ status: false, message: "Task not found." });
          }
          break;

        case "deleteAll":
          await Task.deleteMany({ isTrashed: true });
          break;

        case "restore":
          if (!id) {
            return res.status(400).json({ status: false, message: "Task ID is required for restore action." });
          }
          const taskToRestore = await Task.findById(id);
          if (!taskToRestore) {
            return res.status(404).json({ status: false, message: "Task not found." });
          }
          taskToRestore.isTrashed = false;
          await taskToRestore.save();
          break;

        case "restoreAll":
          await Task.updateMany(
            { isTrashed: true },
            { $set: { isTrashed: false } }
          );
          break;

        default:
          return res.status(400).json({ status: false, message: "Invalid action type." });
      }

      res.status(200).json({
        status: true,
        message: "Operation performed successfully.",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "An error occurred while processing the request." });
    }
  };
  static adminAllTask = async (req, res) => {
    try {
      const { adminId } = req.params;
  
      // Find the admin's information by ID
      const adminInfo = await User.findById(adminId);
  
      if (!adminInfo) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Array to hold the task promises
      let taskPromises = adminInfo.myUser.map(userId => {
        return Task.find({ createdBy: userId });
      });
  
      // Resolve all the promises
      let allTasksArray = await Promise.all(taskPromises);
  
      // Flatten the array (since each find() returns an array)
      let allTasks = [].concat(...allTasksArray);
  
      // Send the response
      res.status(200).json({success:true,allTasks:allTasks});
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
}

export default taskController;
