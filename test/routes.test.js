// const { MongoClient } = require('mongodb');
// const request = require('supertest');
// const Model = require('../model/request');
// const app = require('../routes/routes');

// jest.mock('../model/request.js', () => {
//   return {
//     aggregate: jest.fn().mockReturnThis(),
//     exec: jest.fn(),
//   };
// });
// const mockRequest = {
//   startDate: "2016-01-26",
//   endDate: "2018-02-02",
//   minCount: 2700,
//   maxCount: 3000
// };

// const responseData = {
//   code: 200,
//   msg: "Success",
//   records: [
//     {
//       key: "ibfRLaFT",
//       createdAt: "2016-12-25T16:43:27.909Z",
//       totalCount: 2892
//     },
//     {
//       key: "pxClAvll",
//       createdAt: "2016-12-19T10:00:40.050Z",
//       totalCount: 2772
//     },
//   ]
// };

// const mockResponse = {
//   json: jest.fn()
// }

// describe('find', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(global.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db();
//   });

//   afterAll(async () => {
//     jest.resetAllMocks();
//     await connection.close();
//   });

//   beforeEach(async () => {
//     await db.collection('record').deleteMany({});
//   });

//   it('should get info from get', async () => {
//     jest.setTimeout(10000);
//     const res = await request(app)
//       .get('/api/getInfo')
//       .send(mockRequest)
//     expect(res.statusCode).toEqual(200)
//     expect(res.body).toHaveProperty('get')
//   });

//   it('should find data from db', async () => {
//     mocked(Request.aggregate().exec).mockImplementationOnce((callback) => {
//       callback(null, responseData);
//     });
//     expect(Request.aggregate).toBeCalledWith([
//       { $match: { createdAt: { $gte: new Date(mockRequest.startDate), $lte: new Date(mockRequest.endDate) } } },
//       { $match: { totalCount: { $gte: mockRequest.minCount, $lte: mockRequest.maxCount } } },
//     ]);
//     expect(Request.aggregate().exec).toBeCalledWith(expect.any(Function));
//   });
// });