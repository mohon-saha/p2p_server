const express = require("express");
const timeEntryController = require("../controllers/timeEntry.controller");

const timeEntryRouter = express.Router();

timeEntryRouter.post("/create", timeEntryController.createTimeEntry);

timeEntryRouter.patch("/:id", timeEntryController.updateTimeEntry);

timeEntryRouter.get("/", timeEntryController.getTimeEntries);

timeEntryRouter.get("/today/tasks", timeEntryController.getTodaysTasks);

timeEntryRouter.get("/date/:date/tasks", timeEntryController.getTasksForDate);

timeEntryRouter.get(
  "/date/:date/entries",
  timeEntryController.getTimeEntriesForDate
);

timeEntryRouter.get(
  "/today/entries",
  timeEntryController.getTimeEntriesForToday
);

timeEntryRouter.patch("/:id/complete", timeEntryController.completeTimeEntry);

timeEntryRouter.delete("/:id", timeEntryController.deleteTimeEntry);

module.exports = timeEntryRouter;
