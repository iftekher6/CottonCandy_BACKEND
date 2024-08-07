import { Router } from "express";
import { getProduct , createProduct, paginatedProducts } from "../contollers/productController.js";
import { isAuthenticated } from "../middleware/authentication.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
// import { isAuthenticated} from "../middleware/authentication.js";
import { roles } from "../config/role_list.js";

const router = Router()

router.get('/get' ,getProduct).post('/upload', createProduct)
router.get('/pagination', paginatedProducts)

export default router