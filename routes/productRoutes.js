import { Router } from "express";
import { getProduct , createProduct } from "../contollers/productController.js";
// import { authentication } from "../middleware/authentication.js";

const router = Router()

router.get('/get', getProduct).post('/upload', createProduct)

export default router