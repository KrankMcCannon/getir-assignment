//allow use .env variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const routes = require('./routes/routes');

app.use(cors());

//allow heroku to connect to Mongodb
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
client.connect();

//establish connection on mongodb dabatase
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const database = mongoose.connection;

//check if there is an error on connecting database
database.on('error', (err) => {
  console.log(err)
})

//log message when database is connected
database.once('connected', () => {
  console.log('Database Connected');
})

const app = express();

app.use(express.json());

//allow client to get info on '/api/get-info' endpoint
app.use('/', routes)

//Allow server to listen on 3000 port
app.listen(process.env.PORT, () => {
  console.log(`Server start at ${process.env.PORT}`);
});
