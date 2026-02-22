const TaskCategoryService = require("../services/taskCategory.service");

exports.createTaskCategory = async (req, res) => {
  try {
    const data = req.body;

    const result = await TaskCategoryService.createTaskCategory(data);

    res.status(201).json({
      message: "Task category created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTaskCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedRecord = await TaskCategoryService.updateTaskCategory(
      id,
      updatedData
    );

    res.status(200).json({
      message: "Task category updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskCategories = async (req, res) => {
  try {
    const result = await TaskCategoryService.getTaskCategories();

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch task categories" });
  }
};

exports.deleteTaskCategory = async (req, res) => {
  try {
    const id = req.params.id;

    await TaskCategoryService.deleteTaskCategory(id);

    res.status(200).json({
      message: "Task category deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};
