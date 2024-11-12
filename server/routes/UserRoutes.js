import express from "express"
import UserController from "../controller/UserController.js"
import Authentication from "../middleware/Auth.js"


const router = express.Router()


router.post("/register" , UserController.registration)
router.post("/login" , UserController.login)
router.post("/logout", Authentication , UserController.logout)
router.get("/profile" , Authentication , UserController.myProfile)
router.put("/admin/:id" ,UserController.Admin )
router.put("/addUSer/:adminId" , UserController.addUser)
router.get("/allUser" , UserController.allUser)
router.get('/adminUser/:adminId' , UserController.adminuser)
router.put('/adminAssignTask/:adminId' , UserController.AdminassignTask)
router.get('/Getadminassigntask/:userId' , UserController.Getadminassigntask)
router.put("/deleteAssignTask" , UserController.DeleteassignTask)
router.get("/adminExit" , UserController.isAdminExit)


export default router

