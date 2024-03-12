import { Router } from "express";
import { createAdmin, loginAdmin } from "../contollers/adminController.js";

const router = Router()

router.post('/post', createAdmin)
router.post('/loginAdmin', loginAdmin)


export default router