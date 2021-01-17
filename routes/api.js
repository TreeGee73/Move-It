// Dependancies
const Workout = require("../models/workout.js");

module.exports = function (app) {
  app.get("/api/workouts", async function (req, res) {
    try {
      const workouts = await Workout.find({});
      res.json(workouts);
    } catch (err) {
      res.status(500).end();
    }
  });

  app.get("/api/workouts/range", async function (req, res) {
    try {
      const data = await Workout.find({});
      res.json(data);
    } catch (err) {
      res.status(500).end();
    }
  });

  app.put("/api/workouts/:id", async function ({ params, body }, res) {
    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(
        params.id,
        {
          $push: { exercises: body },
        },
        { new: true, runValidators: true }
      );
      res.json(updatedWorkout);
    } catch (err) {
      res.status(500).end();
    }
  });

  app.post("/api/workouts", async function (req, res) {
    try {
      const newWorkout = await Workout.create({});
      res.json(newWorkout);
    } catch (err) {
      res.status(500).end();
    }
  });
};
