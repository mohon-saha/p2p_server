const DailyCompletionService = require("../services/dailyCompletion.service");

exports.createDailyCompletion = async (req, res) => {
  try {
    const data = req.body;

    const result = await DailyCompletionService.createDailyCompletion(data);

    res.status(201).json({
      message: "Daily completion created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateDailyCompletion = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedRecord = await DailyCompletionService.updateDailyCompletion(
      id,
      updatedData
    );

    res.status(200).json({
      message: "Daily completion updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDailyCompletions = async (req, res) => {
  try {
    const result = await DailyCompletionService.getDailyCompletions();

    res.status(200).json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch daily completions" });
  }
};

exports.deleteDailyCompletion = async (req, res) => {
  try {
    const id = req.params.id;

    await DailyCompletionService.deleteDailyCompletion(id);

    res.status(200).json({
      message: "Daily completion deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};
