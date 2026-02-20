const db = require("../config/sequelize");
const TimeEntry = db.TimeEntry;
const DailyCompletion = db.DailyCompletion;

exports.createTimeEntry = async (data) => {
  const {
    taskId,
    entryDate,
    hours,
    minutes,
    seconds,
    entryType,
    startTime,
    endTime,
  } = data;

  if (!taskId || !entryDate) {
    throw new Error("taskId and entryDate are required");
  }

  const newEntry = await TimeEntry.create({
    taskId,
    entryDate,
    hours: hours || 0,
    minutes: minutes || 0,
    seconds: seconds || 0,
    entryType: entryType || "MANUAL",
    startTime: startTime || null,
    endTime: endTime || null,
    isDeleted: false,
  });

  return newEntry;
};

exports.updateTimeEntry = async (id, updatedData) => {
  const record = await TimeEntry.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!record) {
    throw new Error("Time entry not found");
  }

  // Prevent updating deleted flag directly
  if (updatedData.isDeleted !== undefined) {
    delete updatedData.isDeleted;
  }

  await record.update(updatedData);

  return record;
};

exports.getTimeEntries = async () => {
  const records = await TimeEntry.findAll({
    where: {
      isDeleted: false,
    },
    include: [
      {
        model: db.DailyCompletion,
        as: "task",
        attributes: ["id", "task"],
      },
    ],
    order: [["entryDate", "DESC"]],
  });

  return records;
};

// Get tasks for today
exports.getTodaysTasks = async () => {
  const today = new Date().toISOString().split("T")[0];

  const tasks = await DailyCompletion.findAll({
    where: {
      isDeleted: false,
      taskDate: today,
    },
    order: [["created_at", "ASC"]],
  });

  return tasks;
};

// Get tasks for a specific date
exports.getTasksForDate = async (date) => {
  if (!date) {
    throw new Error("Date is required");
  }

  const tasks = await DailyCompletion.findAll({
    where: {
      isDeleted: false,
      taskDate: date,
    },
    order: [["created_at", "ASC"]],
  });

  return tasks;
};

// Get time entries for a specific date
exports.getTimeEntriesForDate = async (date) => {
  if (!date) {
    throw new Error("Date is required");
  }

  const records = await TimeEntry.findAll({
    where: {
      isDeleted: false,
      entryDate: date,
    },
    include: [
      {
        model: db.DailyCompletion,
        as: "task",
        attributes: ["id", "task"],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return records;
};

// Get time entries for today
exports.getTimeEntriesForToday = async () => {
  const today = new Date().toISOString().split("T")[0];

  const records = await TimeEntry.findAll({
    where: {
      isDeleted: false,
      entryDate: today,
    },
    include: [
      {
        model: db.DailyCompletion,
        as: "task",
        attributes: ["id", "task"],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return records;
};

// Stop/Complete a live time entry
exports.completeTimeEntry = async (id, endTime, hours, minutes, seconds) => {
  const record = await TimeEntry.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!record) {
    throw new Error("Time entry not found");
  }

  if (record.entryType !== "LIVE") {
    throw new Error("Only LIVE entries can be completed");
  }

  await record.update({
    endTime: endTime || new Date(),
    hours: hours || record.hours,
    minutes: minutes || record.minutes,
    seconds: seconds || record.seconds,
  });

  return record;
};

exports.deleteTimeEntry = async (id) => {
  const record = await TimeEntry.findByPk(id);

  if (!record) {
    throw new Error("Time entry not found");
  }

  // Soft delete
  await record.update({ isDeleted: true });

  return true;
};
