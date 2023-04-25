const mongoose = require('mongoose');
const { Dishes } = require('../../../models');
const { createDish } = require('./create');
describe("createDish", () => {

 beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_DB_URI, {
   auth: {
    username: process.env.MONGO_DB_LOGIN,
    password: process.env.MONGO_DB_PASSWORD
   }
  });
  console.log(`mongoose was connected`);
 });

 it("should be saved in db", async () => {
  const req = { body: { price: 56, isAvailable: true } };
  const res = {
   send: jest.fn(),
   status: jest.fn().mockImplementation(() => res)
  };

  await createDish(req, res);
  const _id = res.send.mock.calls[0][0]._id;
  const doc = await Dishes.findById(_id);

  expect(doc).not.toBeNull();
  expect(doc.price).toBe(56);
  expect(doc.isAvailable).toBe(true);
 });
});