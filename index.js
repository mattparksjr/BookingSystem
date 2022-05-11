require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 8080;
const bcrypt = require('bcrypt')
const cors = require('cors');
const helmet = require('helmet');
const authRoute = require('./routes/auth');

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use("/api/v1/auth", authRoute)

app.post('/tshirt/:id', (req, res) => {

    const { id } = req.params;
    const { logo } = req.body;

    if(!logo) {
        res.status(418).send({ message: 'We need a logo!'
        });
    }

    res.status(200).send({
        tshirt: `👕 with your ${logo} and ID of ${id}`,
    });
})

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)