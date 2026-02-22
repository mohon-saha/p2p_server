const express = require("express");
const taskCategoryController = require("../controllers/taskCategory.controller");

const taskCategoryRouter = express.Router();

// Create category
taskCategoryRouter.post("/create", taskCategoryController.createTaskCategory);

// Update category
taskCategoryRouter.patch("/:id", taskCategoryController.updateTaskCategory);

// Get all categories
taskCategoryRouter.get("/", taskCategoryController.getTaskCategories);

// Delete category (soft delete)
taskCategoryRouter.delete("/:id", taskCategoryController.deleteTaskCategory);

module.exports = taskCategoryRouter;
