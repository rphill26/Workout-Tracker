const express = require("express");
const morgan = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// MAKE SURE TO CHANGE THE PATHWAY
mongoose.connect(process.env.MONGODB_URI || "mongodb://workoutTracker:rootroot1@ds253348.mlab.com:53348/heroku_xxrc2fk5",
{ useNewUrlParser: true });
// MAKE SURE TO CHANGE THE PATHWAY


// const databaseUrl = "";
// const collections = [""];

// const db = mongojs(databaseUrl, collections);

// db.on("error", error => {
//     console.log("Database Error:", error);
// });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  