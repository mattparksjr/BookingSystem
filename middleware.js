require('dotenv').config()
const jwt = require('jsonwebtoken')
/******************************************
 * All middleware related functions
 * @author Matthew Parks
 * @version 1.0.0
******************************************/

/**
 * Verify that a given token is valid!
 * @param {*} req Reqest
 * @param {*} res Responce
 * @param {*} next Next handler
 */
exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) res.status(403).json({error: "No API token provided."})
    else {
        jwt.verify(token.split(" ")[1], process.env.SECRET_TOKEN, (err, value) => {
            if (err) res.status(500).json({error: 'Error while verifiying token'})
            req.user = value.data
            next()
        })
    }
}