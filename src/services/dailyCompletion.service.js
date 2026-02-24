const db = require("../config/sequelize");
const DailyCompletion = db.DailyCompletion;

exports.createDailyCompletion = async (data) => {
  const { task, taskDate, isDone, categoryId } = data;

  if (!task || !taskDate) {
    throw new Error("task and taskDate are required");
  }

  const newEntry = await DailyCompletion.create({
    task,
    taskDate,
    isDone: isDone || false,
    categoryId,
  });

  return newEntry;
};

exports.updateDailyCompletion = async (id, updatedData) => {
  const record = await DailyCompletion.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!record) {
    throw new Error("Daily completion not found");
  }

  // Optional: prevent updating deleted flag directly
  if (updatedData.isDeleted !== undefined) {
    delete updatedData.isDeleted;
  }

  await record.update(updatedData);

  return record;
};

exports.getDailyCompletions = async () => {
  const records = await DailyCompletion.findAll({
    where: {
      isDeleted: false,
    },
    order: [["taskDate", "DESC"]],
  });

  return records;
};

// Get tasks that are due today or in the past and not marked as done
exports.getDueTasks = async () => {
  const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  const dueTasks = await DailyCompletion.findAll({
    where: {
      isDeleted: false,
      isDone: false,
      taskDate: {
        [db.Sequelize.Op.lte]: today, // Less than or equal to today
      },
    },
    order: [["taskDate", "ASC"]],
  });

  return dueTasks;
};

// Get todays tasks
// exports.getTodayTasks = async (req, res) => {
//   try {
//     const filters = req.query; // 👈 get query params

//     const result = await DailyCompletion.getTodayTasks(filters);

//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Fetch error:", error);
//     res.status(500).json({ error: "Failed to fetch today's tasks" });
//   }
// };

exports.getTodayTasks = async (filters) => {
  const today = new Date().toLocaleDateString("en-CA"); // avoid timezone issue

  const whereCondition = {
    isDeleted: false,
    taskDate: today,
  };

  // 🔥 Add isDone filter if provided
  if (filters.isDone !== undefined) {
    whereCondition.isDone = filters.isDone === "true";
  }

  const todayTasks = await DailyCompletion.findAll({
    where: whereCondition,
    order: [["taskDate", "ASC"]],
  });

  return todayTasks;
};

// Get tasks for a specific date
exports.getTasksByDate = async (date, filters) => {
  const whereCondition = {
    isDeleted: false,
    taskDate: date,
  };

  // Add isDone filter if provided
  if (filters.isDone !== undefined) {
    whereCondition.isDone = filters.isDone === "true";
  }

  const tasks = await DailyCompletion.findAll({
    where: whereCondition,
    order: [["taskDate", "ASC"]],
  });

  return tasks;
};

exports.deleteDailyCompletion = async (id) => {
  const record = await DailyCompletion.findByPk(id);

  if (!record) {
    throw new Error("Daily completion not found");
  }

  // Soft delete
  await record.update({ isDeleted: true });

  return true;
};
