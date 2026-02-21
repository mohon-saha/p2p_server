const MonthlyGoalService = require("../services/monthlyGoal.service");

exports.createMonthlyGoal = async (req, res) => {
  try {
    const data = req.body;

    const result = await MonthlyGoalService.createMonthlyGoal(data);

    res.status(201).json({
      message: "Monthly goal created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateMonthlyGoal = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await MonthlyGoalService.updateMonthlyGoal(id, updatedData);

    res.status(200).json({
      message: "Monthly goal updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getMonthlyGoals = async (req, res) => {
  try {
    const result = await MonthlyGoalService.getMonthlyGoals();

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch monthly goals" });
  }
};

exports.getGoalsByMonth = async (req, res) => {
  try {
    const month = req.params.month; // YYYY-MM

    const result = await MonthlyGoalService.getGoalsByMonth(month);

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch monthly goals" });
  }
};

exports.getMonthlyGoalsWithTracker = async (req, res) => {
  try {
    const result = await MonthlyGoalService.getMonthlyGoalsWithTracker();
    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch monthly goals" });
  }
};

exports.getMonthlyGoalsWithTrackerByMonth = async (req, res) => {
  try {
    const month = req.params.month; // expected format: YYYY-MM
    const result =
      await MonthlyGoalService.getMonthlyGoalsWithTrackerByMonth(month);
    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch monthly goals with tracker" });
  }
};

exports.deleteMonthlyGoal = async (req, res) => {
  try {
    const id = req.params.id;

    await MonthlyGoalService.deleteMonthlyGoal(id);

    res.status(200).json({
      message: "Monthly goal deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};
