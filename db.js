require('dotenv').config()
const mongoose = require('mongoose')
/******************************************
 * Working with general DB functionality
 * @author Matthew Parks
 * @version 1.0.0
******************************************/

const url = `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, authSource: "admin"})
const db = mongoose.connection

db.on("error", (err) => {
    if(process.env.NODE_ENV != "development") {
        console.log("Error while connecting to database!")
    } else {
        console.log(err)
    }
});

db.once("open", () => {
    console.log("Connected to the DB!")
});

module.exports = db;