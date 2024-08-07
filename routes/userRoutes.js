import { Router } from "express";
// import { getUser, createUser } from "../contollers/userController";
import { getUser, createUser ,loginUser, logout, refreshAccessToken} from "../contollers/userController.js";
import { isAuthenticated } from "../middleware/authentication.js";

const router = Router()

router.post('/post', createUser)
router.post('/login',loginUser)
router.get('/refresh-token',refreshAccessToken)
router.get('/logout', logout)
router.get('/get',isAuthenticated,getUser)

export default router
