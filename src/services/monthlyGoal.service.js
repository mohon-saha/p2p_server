const db = require("../config/sequelize");
const MonthlyGoal = db.MonthlyGoal;
const { Op } = db.Sequelize;

exports.createMonthlyGoal = async (data) => {
  //   const { goalName, goalType, goalValue, goalDate } = data;

  //   if (!goalName || !goalType || !goalDate) {
  //     throw new Error("goalName, goalType and goalDate are required");
  //   }

  const newGoal = await MonthlyGoal.create(data);

  return newGoal;
};

exports.updateMonthlyGoal = async (id, updatedData) => {
  const record = await MonthlyGoal.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!record) {
    throw new Error("Monthly goal not found");
  }

  if (updatedData.isDeleted !== undefined) {
    delete updatedData.isDeleted;
  }

  await record.update(updatedData);

  return record;
};

exports.getMonthlyGoals = async () => {
  return await MonthlyGoal.findAll({
    where: {
      isDeleted: false,
    },
    order: [["goalDate", "DESC"]],
  });
};

exports.getGoalsByMonth = async (month) => {
  // month format: YYYY-MM
  const startDate = `${month}-01`;

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  return await MonthlyGoal.findAll({
    where: {
      isDeleted: false,
      goalDate: {
        [Op.gte]: startDate,
        [Op.lt]: endDate.toISOString().split("T")[0],
      },
    },
    order: [["goalDate", "ASC"]],
  });
};

exports.deleteMonthlyGoal = async (id) => {
  const record = await MonthlyGoal.findByPk(id);

  if (!record) {
    throw new Error("Monthly goal not found");
  }

  await record.update({ isDeleted: true }); // Soft delete

  return true;
};
