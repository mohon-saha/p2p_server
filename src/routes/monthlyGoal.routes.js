const express = require("express");
const monthlyGoalController = require("../controllers/monthlyGoal.controlller");

const monthlyGoalRouter = express.Router();

monthlyGoalRouter.post("/create", monthlyGoalController.createMonthlyGoal);

monthlyGoalRouter.patch("/:id", monthlyGoalController.updateMonthlyGoal);

monthlyGoalRouter.get("/", monthlyGoalController.getMonthlyGoals);

// Get goals by month (YYYY-MM)
monthlyGoalRouter.get("/month/:month", monthlyGoalController.getGoalsByMonth);

monthlyGoalRouter.delete("/:id", monthlyGoalController.deleteMonthlyGoal);

module.exports = monthlyGoalRouter;
