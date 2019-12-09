const express = require("express");
const mongojs = require("mongojs");

const app = express();

const databaseUrl = "";
const collections = [""];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});