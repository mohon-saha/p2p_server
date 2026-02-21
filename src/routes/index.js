const express = require("express");
const apiRouter = express.Router();
// const { path } = require("../app");
const dailyCompletionRouter = require("./dailyCompletionRouter.routes");
const timeEntryRouter = require("./timeEntry.routes");
const taskCategory = require("./taskCategory.routes");
const monthlyGoalRouter = require("./monthlyGoal.routes");
const goalTrackerRouter = require("./goalTracker.route");

// Define your route configurations here
const routers = [
  {
    path: "/daily-completion",
    router: dailyCompletionRouter,
  },
  {
    path: "/time-entry",
    router: timeEntryRouter,
  },
  {
    path: "/task-category",
    router: taskCategory,
  },
  {
    path: "/monthly-goal",
    router: monthlyGoalRouter,
  },
  {
    path: "/goal-tracker",
    router: goalTrackerRouter,
  },
];

// Loop through and attach when available
routers.forEach(({ path, router, middlewares }) => {
  if (router) {
    if (middlewares && middlewares.length > 0) {
      apiRouter.use(path, ...middlewares, router);
    } else {
      apiRouter.use(path, router);
    }
  }
});

module.exports = apiRouter;
