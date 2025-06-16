import { Router } from "express";
import getCategories from "../services/categories/getCategories.js";
import createCategory from "../services/categories/createCategory.js";
import getCategoryById from "../services/categories/getCategoryById.js";
import deleteCategoryById from "../services/categories/deleteCategoryById.js";
import updateCategoryById from "../services/categories/updateCategoryById.js";
import auth from "../middleware/auth.js";

const router = Router();
// GET /api/categories - Get all categories
router.get("/", async (_req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// POST /api/categories - Create a new category
router.post("/", auth, async(req, res) => {
  const { name } = req.body;
  const newCategory = await createCategory(name);
  res.status(201).json(newCategory);
});
// GET /api/categories/:id - Get a category by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).json({ message: `Category with id ${id} not found` });
    }
    res.json({ data: category });
  } catch (error) {
    console.error("Error fetching category by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// DELETE /api/categories/:id - Delete a category by ID
router.delete("/:id", auth, async(req, res) => {
  const { id } = req.params;
  const category = await deleteCategoryById(id);

  if (category) {
    res.status(200).send({
      message: `Category with id ${id} successfully deleted`,
      category,
    });
  } else {
    res.status(404).json({
      message: `Category with id ${id} not found`,
    });
  }
});
// PUT /api/categories/:id - Update a category by ID
router.put("/:id", auth, async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await updateCategoryById(id, { name });

  if (category) {
    res.status(200).send({
      message: `Category with id ${id} successfully updated`,
      category,
    });
  } else {
    res.status(404).json({
      message: `Category with id ${id} not found`,
    });
  }
});

export default router;
