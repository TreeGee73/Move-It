// Dependacies & Variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the database schema / model workout properties
const WorkoutSchema = new Schema({
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
},
  {
    toJSON: {
      virtuals: true,
    },
  }
);

WorkoutSchema.virtual('totalDuration').get(function () {
  return this.exercises.reduce((sum, exercise) => sum + exercise.duration, 0);
});

const workout = mongoose.model('WorkoutSchema', WorkoutSchema);
module.exports = workout;