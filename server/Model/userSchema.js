import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  myAdmin: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Reference to User model
  },

  myUser: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User", // Reference to User model
      default: null,
    },
  ],

  adminAssignedTask: [
    {
      User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model
        required: true // Optional: Makes User reference required
      },
      tasks: [
        {
          date: {
            type: Date,
            default: Date.now,
          },
          task: {
            type: String,
          },
        }

      ]
     // Optional: Makes tasks array required
      
    }
  ]




});

const User = mongoose.model("User", userSchema);
export default User;
