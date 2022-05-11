require('dotenv').config()
/******************************************
 * Utility functions for the entire project
 * @author Matthew Parks
 * @version 1.0.0
******************************************/

function isProd() {
    return process.env.NODE_ENV != "development";
}

module.exports = { isProd }