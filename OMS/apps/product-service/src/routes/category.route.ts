import { Router } from "express"

import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller.js";

const router: Router = Router();

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.post("/:id", deleteCategory)
router.get("/", getCategories)

export default router;