require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// App Setup
app.set("port", PORT);
app.set("env", NODE_ENV);

app.use(logger("tiny"));
app.use(bodyParser.json());

// Each route is added here
app.use("/", require(path.join(__dirname, "routes/stats")));
app.use("/", require(path.join(__dirname, "routes/employee")));

// Default error handler for 404
app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    next(err);
});

// If we cannot return a 404, e.g. path found, server not working
// return a 500 error
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

// Run the app
app.listen(PORT, () => {
    console.log(
        `Express Server started on Port ${app.get(
            "port"
        )} | Environment: ${app.get("env")}`
    );
});