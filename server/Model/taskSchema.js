import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["completed", "incomplete", "progress", "todo"],
    default: "incomplete",
  },
  priority: {
    type: String,
    required: true,
    enum: ["high", "medium", "low"],
  },
  favourite: {
    type: Boolean,
    default: false,
  },

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  submitDate: {
    type: Date,
    default: Date.now,
  },
  isTrashed: {
    type: Boolean,
    default: false,
  },

  submitDateByUser: {
    date: {
      type: Date,
    },
    status: {
      type: String,
    },
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
