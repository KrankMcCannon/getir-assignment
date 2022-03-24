//allow use .env variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const Request = require('./model/request');

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

//list all connected database
const listDatabases = async (client) => {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//setup database connection
const main = async () => {
  const MONGODB_URI = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?authSource=admin&replicaSet=challenge-shard-0&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
  //establish connection on mongodb dabatase
  const client = new MongoClient(MONGODB_URI);
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);

    //allow client to get info on '/get-info' endpoint
    app.get('/', (req, res) => {
      //Manually redirect to the right endpoint
      res.json('Go to /getInfo to see something');
    })

    //Get Method
    app.get('/getInfo', async (req, res) => {
      const response = {
        code: res.statusCode,
        msg: "Success",
        records: []
      };

      client
        .db("getir-case-study")
        .collection('records')
        .aggregate([
          //filter between two date from req
          { $match: { createdAt: { $gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate) } } },
          //sum all counts elements
          { $addFields: { totalCount: { $sum: "$counts" } } },
          //filter between two number from req
          { $match: { totalCount: { $gte: req.body.minCount, $lte: req.body.maxCount } } },
          //remove useless fields
          { $unset: ["_id", "value", "counts"] }
        ]).toArray((err, result) => {
          if (err) res.send({ error: err.message });
          if (result.length) {
            response.records = result;
            res.send(response);
          } else {
            res.send({ data: 'No docs found' });
          }
        });
    })

    //Allow server to listen on 3000 port
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Running on http://localhost:${PORT}`);
    });

  } catch (e) {
    //check if there is an error on connecting database
    console.error(e);
  }
}

//start connection database
main().catch(console.error);
