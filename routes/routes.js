const express = require('express');
const Request = require('../model/request');
// const Response = require('../model/response');

const router = express.Router();

//router allow us to create CRUD RESTful API
module.exports = router;

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
    { $unset: "_id" },
    { $unset: "value" },
    { $unset: "counts" }
  ]);

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