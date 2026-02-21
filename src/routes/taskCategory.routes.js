const express = require("express");
const dailyCompletionController = require("../controllers/createDailyCompletion.controller");

const taskCategory = express.Router();

taskCategory.post("/create", dailyCompletionController.createDailyCompletion);

taskCategory.patch("/:id", dailyCompletionController.updateDailyCompletion);

taskCategory.get("/", dailyCompletionController.getDailyCompletions);

taskCategory.delete("/:id", dailyCompletionController.deleteDailyCompletion);

module.exports = taskCategory;
