// Dependancies
const path = require("path");

// HTML Routes
module.exports = function (app) {
  // Writes and displays the last workout on the main page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Writes and displays the page to enter an exercise/workout
  app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

  // Writes and displays the page to provide the client with their
  // exercise/workout statistics for a seven day period
  app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
};
