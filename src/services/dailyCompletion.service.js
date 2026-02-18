const db = require("../config/sequelize");
const DailyCompletion = db.DailyCompletion;

exports.createDailyCompletion = async (data) => {
  const { task, taskDate, isDone } = data;

  if (!task || !taskDate) {
    throw new Error("task and taskDate are required");
  }

  const newEntry = await DailyCompletion.create({
    task,
    taskDate,
    isDone: isDone || false,
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

exports.deleteDailyCompletion = async (id) => {
  const record = await DailyCompletion.findByPk(id);

  if (!record) {
    throw new Error("Daily completion not found");
  }

  // Soft delete
  await record.update({ isDeleted: true });

  return true;
};
