const express = require("express");
const goalTrackerController = require("../controllers/goalTracker.controller");

const goalTrackerRouter = express.Router();

// Create a tracker
goalTrackerRouter.post("/create", goalTrackerController.createGoalTracker);

// Update a tracker
goalTrackerRouter.patch("/:id", goalTrackerController.updateGoalTracker);

// Get all trackers
goalTrackerRouter.get("/", goalTrackerController.getAllGoalTrackers);

// Get trackers by goal
goalTrackerRouter.get("/goal/:goalId", goalTrackerController.getTrackersByGoal);

// Get goal trackers data by goal
goalTrackerRouter.get("/goal/:goalId", goalTrackerController.getGoalTrackers);

// Delete tracker
goalTrackerRouter.delete("/:id", goalTrackerController.deleteGoalTracker);

module.exports = goalTrackerRouter;
