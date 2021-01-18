// Dependacies & Variables
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5201;
const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Routes
require("./routes/api.js")(app);
require("./routes/view.js")(app);

// Start the server and begin listening for client requests
app.listen(PORT, function () {
  // Server log to indicate the server has started running
  console.log(`Server is listening on: http://localhost:${PORT}`);
});
