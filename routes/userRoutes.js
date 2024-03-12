import { Router } from "express";
// import { getUser, createUser } from "../contollers/userController";
import { getUser, createUser ,loginUser, logout} from "../contollers/userController.js";
import { isAuthenticated } from "../middleware/authentication.js";

const router = Router()

router.post('/post', createUser)
router.post('/login',loginUser)
router.get('/logout', logout)
router.get('/get',getUser)

export default router
