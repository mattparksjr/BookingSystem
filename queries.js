require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
})

function query(req) {
    pool.query(request, null, (error, results) => {
        if(error) {
            throw error
        }
    })
}

const getUserById = (request, responce) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM employees WHERE ID = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        responce.status(200).json(results.rows)
    })
}



module.exports = {
    getUserById,
}