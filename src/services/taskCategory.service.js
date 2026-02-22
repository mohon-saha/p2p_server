const db = require("../config/sequelize");
const TaskCategory = db.TaskCategory;

exports.createTaskCategory = async (data) => {
  const { category } = data;

  if (!category) {
    throw new Error("Category name is required");
  }

  const newCategory = await TaskCategory.create({
    category,
  });

  return newCategory;
};

exports.updateTaskCategory = async (id, updatedData) => {
  const record = await TaskCategory.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!record) {
    throw new Error("Task category not found");
  }

  await record.update(updatedData);
  return record;
};

exports.getTaskCategories = async () => {
  const categories = await TaskCategory.findAll({
    where: {
      isDeleted: false,
    },
    order: [["created_at", "DESC"]],
  });

  return categories;
};

exports.deleteTaskCategory = async (id) => {
  const record = await TaskCategory.findByPk(id);

  if (!record) {
    throw new Error("Task category not found");
  }

  // Soft delete
  await record.update({ isDeleted: true });

  return true;
};
