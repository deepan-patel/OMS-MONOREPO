import { Router } from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router: Router = Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.post("/:id", deleteProduct)
router.get("/:id", getProduct)
router.get("/", getProducts)

export default router;