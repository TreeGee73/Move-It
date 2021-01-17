// Dependancies
const Workout = require("../models/workout.js");

module.exports = function (app) {
  // Creates a new workout based on client data
  app.post("/api/workouts", function (req, res) {
    Workout.create({})
      .then(function (dbWorkout) {
        res.json(dbWorkout);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Adds a new exercise
  app.put("/api/workouts/:id", function ({ body, params }, res) {
    Workout.findByIdAndUpdate(
      params.id,
      //
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then(function (dbWorkouts) {
        res.json(dbWorkouts);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Get and display all exercises for the day and display with a total workout duration
  app.get("/api/workouts", function (req, res) {
    // Uses 'aggrigate' to dynamically create 'total duration' field and make it equal to the sum of the durations of all exercises
    Workout.aggregate([
      { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
    ])
      .then(function (dbWorkouts) {
        res.json(dbWorkouts);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Gets all exercises and workouts for a set period
  app.get("/api/workouts/range", function (req, res) {
    // Uses 'aggrigate' to dynamically create 'total duration' field and make it equal to the sum of the durations of all exercises
    Workout.aggregate([
      { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
    ])
      // Sorts in decending order by exercise durtion (from line 47)
      .sort({ _id: -1 })
      // Limits the range to seven days
      .limit(7)
      .then(function (dbWorkouts) {
        console.log(dbWorkouts);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Posts the exercises and workouts for the selected period
  app.post("/api/workouts/range", function (req, res) {
    Workout.create({})
      .then(function (dbWorkout) {
        res.json(dbWorkout);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Deletes the exercise/workout from the database
  app.delete("/api/workouts", function ({ body }, res) {
    Workout.findByIdAndDelete(body.id)
      .then(function () {
        res.json(true);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};
