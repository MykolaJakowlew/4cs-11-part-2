const mongoose = require('mongoose');
const { getDishes } = require('./get');
const { Dishes } = require('../../../models');

describe("getDishes", () => {
 beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_DB_URI, {
   auth: {
    username: process.env.MONGO_DB_LOGIN,
    password: process.env.MONGO_DB_PASSWORD
   }
  });
  console.log(`mongoose was connected`);

  await Dishes.insertMany([
   { price: 45, isAvailable: true },
   { price: 56, isAvailable: false },
   { price: 465, isAvailable: true },
   { price: 56, isAvailable: true },
   { price: 45, isAvailable: false },
   { price: 56, isAvailable: true },
  ]);
 });

 it("should return correct data by query: price,isAvailable", async () => {
  const req = { query: { price: '{"gt":55,"lt":57}', isAvailable: 'true' } };
  const res = {
   send: jest.fn(),
   status: jest.fn().mockImplementation(() => res)
  };

  await getDishes(req, res);

  const result = res.send.mock.calls[0][0];

  expect(result.length).toBe(2);
  expect(result.every(el => el.price == 56)).toBe(true);
  expect(result.every(el => el.isAvailable == true)).toBe(true);
 });
 it("should return correct data by query: price", async () => {
  const req = { query: { price: '{"gt":55,"lt":57}' } };
  const res = {
   send: jest.fn(),
   status: jest.fn().mockImplementation(() => res)
  };

  await getDishes(req, res);

  const result = res.send.mock.calls[0][0];

  expect(result.length).toBe(3);
  expect(result.every(el => el.price == 56)).toBe(true);
 });
 it("should return correct data by query: isAvailable", async () => {
  const req = { query: { isAvailable: 'true' } };
  const res = {
   send: jest.fn(),
   status: jest.fn().mockImplementation(() => res)
  };

  await getDishes(req, res);

  const result = res.send.mock.calls[0][0];

  expect(result.length).toBe(4);
  expect(result.every(el => el.isAvailable == true)).toBe(true);
 });
});