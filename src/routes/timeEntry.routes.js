const express = require("express");
const timeEntryController = require("../controllers/timeEntry.controller");

const timeEntryRouter = express.Router();

/*



*/

// Create a new time entry
timeEntryRouter.post("/create", timeEntryController.createTimeEntry);

// Update an existing time entry
timeEntryRouter.patch("/:id", timeEntryController.updateTimeEntry);

// Get all time entries
timeEntryRouter.get("/", timeEntryController.getTimeEntries);

// Get today's tasks
// timeEntryRouter.get("/today/tasks", timeEntryController.getTodaysTasks);

// timeEntryRouter.get("/date/:date/tasks", timeEntryController.getTasksForDate);

// Get time entries for a specific date, e.g., /date/2024-06-15/entries
timeEntryRouter.get(
  "/date/:date/entries",
  timeEntryController.getTimeEntriesForDate
);

// Get time entries for today,
timeEntryRouter.get(
  "/today/entries",
  timeEntryController.getTimeEntriesForToday
);

timeEntryRouter.patch("/:id/complete", timeEntryController.completeTimeEntry);

timeEntryRouter.delete("/:id", timeEntryController.deleteTimeEntry);

module.exports = timeEntryRouter;
