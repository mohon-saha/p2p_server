const express = require("express");
const apiRouter = express.Router();
// const { path } = require("../app");
const dailyCompletionRouter = require("./dailyCompletionRouter.routes");
const timeEntryRouter = require("./timeEntry.routes");

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
