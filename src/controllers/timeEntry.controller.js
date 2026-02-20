const TimeEntryService = require("../services/timeEntry.service");

exports.createTimeEntry = async (req, res) => {
  try {
    const data = req.body;

    const result = await TimeEntryService.createTimeEntry(data);

    res.status(201).json({
      message: "Time entry created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTimeEntry = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedRecord = await TimeEntryService.updateTimeEntry(
      id,
      updatedData
    );

    res.status(200).json({
      message: "Time entry updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTimeEntries = async (req, res) => {
  try {
    const result = await TimeEntryService.getTimeEntries();

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch time entries" });
  }
};

exports.getTodaysTasks = async (req, res) => {
  try {
    const result = await TimeEntryService.getTodaysTasks();

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch today's tasks" });
  }
};

exports.getTasksForDate = async (req, res) => {
  try {
    const date = req.params.date;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    const result = await TimeEntryService.getTasksForDate(date);

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch tasks for date" });
  }
};

exports.getTimeEntriesForDate = async (req, res) => {
  try {
    const date = req.params.date;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    const result = await TimeEntryService.getTimeEntriesForDate(date);

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch time entries for date" });
  }
};

exports.getTimeEntriesForToday = async (req, res) => {
  try {
    const result = await TimeEntryService.getTimeEntriesForToday();

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch today's time entries" });
  }
};

exports.completeTimeEntry = async (req, res) => {
  try {
    const id = req.params.id;
    const { endTime, hours, minutes, seconds } = req.body;

    const result = await TimeEntryService.completeTimeEntry(
      id,
      endTime,
      hours,
      minutes,
      seconds
    );

    res.status(200).json({
      message: "Time entry completed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Complete error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTimeEntry = async (req, res) => {
  try {
    const id = req.params.id;

    await TimeEntryService.deleteTimeEntry(id);

    res.status(200).json({
      message: "Time entry deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};
