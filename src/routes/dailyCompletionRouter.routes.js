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

module.exports = dailyCompletionRouter;
