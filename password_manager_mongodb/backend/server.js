const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


const dbName = 'OpManager';
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

// console.log(process.env.MONGO_URI)
app.get('/', async (req, res) => {
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async (req, res) => {
  const passw = req.body
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(passw);
  res.json(req.body)
})
app.delete('/', async (req, res) => {
  const passw = req.body
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(passw);
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})