const GoalTrackerService = require("../services/goalTracker.service");

exports.createGoalTracker = async (req, res) => {
  try {
    const data = req.body;
    const result = await GoalTrackerService.createGoalTracker(data);

    res.status(201).json({
      message: "Goal tracker created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateGoalTracker = async (req, res) => {
  try {
    const id = req.params.id;
    const { trackingValue } = req.body;

    const result = await GoalTrackerService.updateGoalTracker(
      id,
      trackingValue
    );

    res.status(200).json({
      message: "Goal tracker updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllGoalTrackers = async (req, res) => {
  try {
    const result = await GoalTrackerService.getAllGoalTrackers();

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch goal trackers" });
  }
};

exports.getTrackersByGoal = async (req, res) => {
  try {
    const goalId = req.params.goalId;
    const result = await GoalTrackerService.getTrackersByGoal(goalId);

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch trackers for goal" });
  }
};

exports.getGoalTrackers = async (req, res) => {
  try {
    const result = await GoalTrackerService.getGoalTrackers();

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch trackers for goal" });
  }
};

exports.deleteGoalTracker = async (req, res) => {
  try {
    const id = req.params.id;

    await GoalTrackerService.deleteGoalTracker(id);

    res.status(200).json({
      message: "Goal tracker deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};
