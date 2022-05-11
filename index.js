require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 8080;
const bcrypt = require('bcrypt')

const { MongoClient } = require('mongodb');

const url = `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`
const client = new MongoClient(url)
const dbName = "booking"
async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');
  
    const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
    console.log('Inserted documents =>', insertResult);
  
    return 'done.';
}

main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());

app.use(express.json())

const users = []

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.id = req.body.id)
    if(user == null) {
        return res.status(400).send('Cannot find user')
    }

    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Correct')
        } else {
            res.send('Not Allowed')
        }
    } catch(e) {
        res.status(500).send()
    }
})

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: '👕',
        size: 'large'
    });
})

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