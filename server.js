const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(logger("dev"));

const PORT =
  8080 ||
  "mongodb://workoutTracker:rootroot1@ds253348.mlab.com:53348/heroku_xxrc2fk5";

// MAKE SURE TO CHANGE THE PATHWAY
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://workoutTracker:rootroot1@ds253348.mlab.com:53348/heroku_xxrc2fk5",
  { useNewUrlParser: true }
);

db.Exercise.create({ name: "First Workout!", workouts: [] })
  .then(dbExercise => {
    console.log(dbExercise);
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.get("/exercise", (req, res) => {
  db.Exercise.find({})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/workout", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  db.Workout.create(body)
    .then(({ _id }) =>
      db.Exercise.findOneAndUpdate(
        {},
        { $push: { Workout: _id } },
        { new: true }
      )
    )
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .then(dbExercise => {
      JSON.stringify(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
