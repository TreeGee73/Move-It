// Dependacies & Variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the database schema / model workout properties
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: function () {
      return new Date();
    },
  },
  exercises: [
    {
      type: { type: String, trim: true, required: "Enter an exercise type:" },
      name: { type: String, trim: true, required: "Enter an exercise name:" },
      duration: {
        type: Number,
        required: "Enter an exercise duration in minutes:",
      },
      weight: { type: Number },
      reps: { type: Number },
      sets: { type: Number },
      distance: { type: Number },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
