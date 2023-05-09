const { default: mongoose, Types } = require('mongoose');
const { getTables } = require('./getTables');
const { Tables } = require('../../../models');

describe("getTables", () => {
 let tableMock = [];

 beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_DB_URI, {
   auth: {
    password: process.env.MONGO_DB_PASSWORD,
    username: process.env.MONGO_DB_LOGIN
   }
  });

  tableMock = await Tables.insertMany([
   {
    tableId: 1,
    waiterId: new Types.ObjectId(),
    orderId: new Types.ObjectId(),
   },
   {
    tableId: 2,
    waiterId: new Types.ObjectId(),
   },
   {
    tableId: 3,
    waiterId: new Types.ObjectId(),
    orderId: new Types.ObjectId(),
   }
  ]);

 });

 it("should return all tables", async () => {
  const req = { query: {} };
  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  await getTables(req, res);

  expect(res.send).toBeCalled();
  expect(res.send.mock.calls[0][0]).toBeInstanceOf(Array);
  const response = res.send.mock.calls[0][0];
  expect(response.map(e => e.toObject()))
   .toMatchObject(tableMock.map(e => e.toObject()));
 });

 it('should be correct query when isFree is true', async () => {
  const req = { query: { isFree: 'true' } };
  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  await getTables(req, res);

  const response = res.send.mock.calls[0][0];
  expect(response.map(e => e.toObject())).toMatchObject([
   tableMock[1].toObject()
  ]);
 });

 it('should be correct query when isFree is false', async () => {
  const req = { query: { isFree: 'false' } };
  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  await getTables(req, res);

  const response = res.send.mock.calls[0][0];
  expect(response.map(e => e.toObject())).toMatchObject([
   tableMock[0].toObject(),
   tableMock[2].toObject(),
  ]);
 });
});