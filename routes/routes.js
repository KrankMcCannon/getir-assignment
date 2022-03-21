const express = require('express');
const Request = require('../model/request');

const router = express.Router();

//router allow us to create CRUD RESTful API
module.exports = router;

//Manually redirect to the right endpoint
router.get('/', (req, res) => {
  res.send('Go to /api/getInfo to see something');
}) /

  //Get Method
  router.get('/getInfo', async (req, res) => {

    const data = await Request.aggregate([
      //filter between two date from req
      { $match: { createdAt: { $gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate) } } },
      //sum all counts elements
      { $addFields: { totalCount: { $sum: "$counts" } } },
      //filter between two number from req
      { $match: { totalCount: { $gte: req.body.minCount, $lte: req.body.maxCount } } },
      //remove useless fields
      { $unset: ["_id", "value", "counts"] }
    ]);

    if (!data) {
      throw new Error('Something goes wrong with aggregate');
    }

    try {
      const response = {
        code: res.statusCode,
        msg: "Success",
        records: data
      };
      res.send(response);
    }
    catch (error) {
      const response = {
        code: res.statusCode,
        msg: error.message,
        records: data
      };
      res.send(response);
    }
  })