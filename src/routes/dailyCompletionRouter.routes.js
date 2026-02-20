const express = require("express");
const dailyCompletionController = require("../controllers/createDailyCompletion.controller");

const dailyCompletionRouter = express.Router();

dailyCompletionRouter.post(
  "/create",
  dailyCompletionController.createDailyCompletion
);

dailyCompletionRouter.patch(
  "/:id",
  dailyCompletionController.updateDailyCompletion
);

dailyCompletionRouter.get("/", dailyCompletionController.getDailyCompletions);

dailyCompletionRouter.delete(
  "/:id",
  dailyCompletionController.deleteDailyCompletion
);

dailyCompletionRouter.get("/due-tasks", dailyCompletionController.getDueTasks);

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
