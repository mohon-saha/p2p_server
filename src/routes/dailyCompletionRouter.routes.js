const express = require("express");
const dailyCompletionController = require("../controllers/createDailyCompletion.controller");

const dailyCompletionRouter = express.Router();

/*
 ** Create a new daily completion entry
 ** Update an existing daily completion entry by ID
 ** Get all daily completion entries
 ** Delete a daily completion entry by ID
 ** Get tasks that are due today or in the past and not marked as done
 ** Get tasks that are due today
 ** Get tasks for a specific date
 */

// Create a new daily completion entry
dailyCompletionRouter.post(
  "/create",
  dailyCompletionController.createDailyCompletion
);

// Update an existing daily completion entry by ID
dailyCompletionRouter.patch(
  "/:id",
  dailyCompletionController.updateDailyCompletion
);

// Get all daily completion entries
dailyCompletionRouter.get("/", dailyCompletionController.getDailyCompletions);

// Delete a daily completion entry by ID (soft delete)
dailyCompletionRouter.delete(
  "/:id",
  dailyCompletionController.deleteDailyCompletion
);

// Get tasks that are due today or in the past and not marked as done
dailyCompletionRouter.get("/due-tasks", dailyCompletionController.getDueTasks);

// Get tasks that are due today
dailyCompletionRouter.get(
  "/today-tasks",
  dailyCompletionController.getTodayTasks
);

// get taks for a specific date (e.g., /daily-completion/date/2024-06-15/tasks)
dailyCompletionRouter.get(
  "/date/:date/tasks",
  dailyCompletionController.getTasksByDate
);

module.exports = dailyCompletionRouter;
