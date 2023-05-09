const { Tables } = require('../../../models');
const { getTables } = require('./getTables');

jest.mock('../../../models', () => ({
 Tables: {
  find: jest.fn().mockResolvedValue([{}, {}])
 }
}));

describe('getTables', () => {
 it('get all tables', async () => {
  const req = { query: {} };
  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  await getTables(req, res);

  expect(res.send).toBeCalled();
  expect(res.send.mock.calls[0][0]).toBeInstanceOf(Array);
  expect(res.send.mock.calls[0][0].length).toEqual(2);
 });

 it('should return error message when isFree has wrong value', async () => {
  const req = { query: { isFree: 'blabla' } };
  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  await getTables(req, res);

  expect(res.status).toBeCalledWith(400);
  expect(res.send).toBeCalledWith({
   message: 'Parameter isFree can have only one value from the nest list: true, false'
  });
 });

 it('should be correct query when isFree is true', async () => {
  const req = { query: { isFree: 'true' } };
  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  await getTables(req, res);

  expect(Tables.find).toBeCalledWith({
   orderId: { $exists: false }
  });
 });

 it('should be correct query when isFree is false', async () => {
  const req = { query: { isFree: 'false' } };
  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  await getTables(req, res);

  expect(Tables.find).toBeCalledWith({
   orderId: { $exists: true }
  });
 });
});