const db = require("../config/sequelize");
const GoalTracker = db.GoalTracker;
const MonthlyGoal = db.MonthlyGoal;

exports.createGoalTracker = async (data) => {
  const { goalId, trackingDate, trackingValue } = data;

  // 1️⃣ Check goal exists
  const goal = await MonthlyGoal.findByPk(goalId);
  if (!goal) throw new Error("Monthly goal not found");

  // 2️⃣ Validate based on goal type
  if (goal.goalType === "boolean") {
    if (![0, 1, "0", "1", true, false].includes(trackingValue))
      throw new Error("Boolean goal must have value 0 or 1");
  }
  if (goal.goalType === "text") {
    if (!trackingValue || typeof trackingValue !== "string")
      throw new Error("Text goal must have string value");
  }

  // Normalize boolean
  let value = trackingValue;
  if (goal.goalType === "boolean") {
    value = trackingValue == 1 || trackingValue === true ? "1" : "0";
  }

  // 3️⃣ Prevent duplicate tracking for same goal + date
  const existing = await GoalTracker.findOne({
    where: { goalId, trackingDate },
  });
  if (existing) throw new Error("Tracking already exists for this date");

  return await GoalTracker.create({
    goalId,
    trackingDate,
    trackingValue: value,
  });
};

exports.updateGoalTracker = async (id, trackingValue) => {
  const tracker = await GoalTracker.findByPk(id);
  if (!tracker) throw new Error("Goal tracker not found");

  const goal = await MonthlyGoal.findByPk(tracker.goalId);

  if (goal.goalType === "boolean") {
    if (![0, 1, "0", "1", true, false].includes(trackingValue))
      throw new Error("Boolean goal must have value 0 or 1");

    trackingValue = trackingValue == 1 || trackingValue === true ? "1" : "0";
  }

  if (goal.goalType === "text") {
    if (!trackingValue || typeof trackingValue !== "string")
      throw new Error("Text goal must have string value");
  }

  tracker.trackingValue = trackingValue;
  await tracker.save();

  return tracker;
};

exports.getAllGoalTrackers = async () => {
  return await GoalTracker.findAll({
    order: [["trackingDate", "ASC"]],
  });
};

exports.getTrackersByGoal = async (goalId) => {
  return await GoalTracker.findAll({
    where: { goalId },
    order: [["trackingDate", "ASC"]],
  });
};

exports.getGoalTrackers = async (goalId) => {
  return await GoalTracker.findAll({
    where: { goalId },
    order: [["trackingDate", "ASC"]],
  });
};

exports.deleteGoalTracker = async (id) => {
  const tracker = await GoalTracker.findByPk(id);
  if (!tracker) throw new Error("Goal tracker not found");

  await tracker.destroy(); // hard delete
  return true;
};
