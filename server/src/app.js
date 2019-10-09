const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const bookmark = require('./routes/bookmark');

const configFile = fs.readFileSync('config.json');
const config = JSON.parse(configFile);

// App initialization ---------------------------------------------------------
const app = express();

// Database connection --------------------------------------------------------
const databaseURI = config.databaseURI;
mongoose.connect(databaseURI, {useNewUrlParser: true});
const db = mongoose.connection;

db.on("error", () => console.error.bind(console, "Database connection error"));
db.once("open", () => console.log("Database connection succeeded"));

// App settings & launch ------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/api', bookmark);

app.listen(8081, () => {
    console.log('Server launched on port 8081');
});

module.exports = app;
module.exports.handler = serverless(app);
