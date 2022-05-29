const mongoose = require('mongoose')
/******************************************
 * User model for admin(employees)
 * @author Matthew Parks
 * @version 1.0.0
******************************************/

const model = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("Employee", model)