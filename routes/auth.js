const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const db = require('../db')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')
const { isProd } = require('../util')
/******************************************
 * Auth related API endpoints
 * @author Matthew Parks
 * @version 1.0.0
******************************************/

router.post('/admin/login', async (req, res) => {
    // Make sure we have all of the needed info!
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({error: "Invalid Request."})
    }

    // Find the matching admin login, return auth token
    db.db.collection('admins').findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            return res.status(404).json({error: "User does not exist."})
        }

        bcrypt.compare(req.body.password, user.password, (error, match) => {
            if(error) {
                return res.status(500).json({error: "Error processing request."})
            }
            if(match) {
                return res.status(200).json({token: generateToken(user)})
            } else {
                return res.status(403).json({error: "Invalid login."})
            }
        })
    })
    .catch(error => {
        res.status(500).json({error: error})
    })
});

router.post('/admin/signup', middleware.verify, async (req, res) => {

    // Make sure we have all of the needed info!
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.role) {
        return res.status(400).json({"error": "Invalid Request."})
    }

    // Hash the password, save the user to the DB, and generate their token
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = Admin({email: req.body.email, password: hashedPassword, role: req.body.role, name: req.body.name})
    await db.db.collection('admins').insertOne(newUser);
    return res.status(200).json({token: generateToken(newUser)})
});

/**
 * Generate a token for a user
 * @param {*} user The user to use
 * @returns Token as a string
 */
function generateToken(user) {
    return jwt.sign({data: user}, process.env.SECRET_TOKEN, {expiresIn: '24h'})
}

module.exports = router