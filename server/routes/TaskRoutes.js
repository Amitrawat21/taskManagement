
import express from "express"
import taskController from "../controller/TaskController.js"
import Authentication from "../middleware/Auth.js"
import UserController from "../controller/UserController.js"

const router = express.Router()


router.post("/create" ,  taskController.createTask)
router.delete("/delete/:id" , taskController.deleteTask);
router.put("/update/:id",  taskController.updateTask);
router.get("/mytask/:id",  taskController.getMyTask);
router.get("/single/:id",taskController.getSingleTask);
router.put("/favourite/:id" , taskController.setFavouriteTask)
router.put("/favourite/:id" , taskController.setFavouriteTask)
router.put("/trash/:id" , taskController.trashTask)
router.delete("/delete-restore/:id?" , taskController.deleteRestoreTask)
router.get("/adminAllUser/:adminId", taskController.adminAllTask)



export default router