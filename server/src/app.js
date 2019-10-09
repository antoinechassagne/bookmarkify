const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const bookmark = require('./routes/bookmark');

// App initialization ---------------------------------------------------------
const app = express();

// Database connection --------------------------------------------------------
const databaseURI = process.env.DATABASEURI;
mongoose.connect(databaseURI, {useNewUrlParser: true});
const db = mongoose.connection;

db.on("error", () => console.error.bind(console, "Database connection error"));
db.once("open", () => console.log("Database connection succeeded"));

// App settings & launch ------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/.netlify/functions/server', bookmark);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
