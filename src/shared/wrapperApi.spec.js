const { wrapperApi } = require('./wrapperApi');

global.console.error = jest.fn();

describe("wrapperApi", () => {

 describe("should be success", () => {
  it("and return undefined", async () => {
   const mock = jest.fn()
    .mockImplementation(async () => { });
   const handler = wrapperApi(mock);

   const result = await handler();

   expect(result).toEqual(undefined);
  });

  it("and handler was called", async () => {
   const mock = jest.fn()
    .mockImplementation(async () => { });
   const handler = wrapperApi(mock);

   await handler();

   expect(mock).toBeCalled();
  });
 });

 describe("should throw an error", () => {

  const err = new Error("PLACEHOLDER ERROR TEXT");
  const mock = jest.fn()
   .mockImplementation(async () => { throw err; });
  const req = jest.fn();
  const res = {};
  res.status = jest.fn().mockImplementation(() => res);
  res.send = jest.fn();

  it("and return 500 status code", async () => {
   const handler = wrapperApi(mock);
   await handler(req, res);

   expect(res.status.mock.calls[0]).toEqual([500]);
  });
  it("and return internal server error", async () => {
   const handler = wrapperApi(mock);
   await handler(req, res);

   expect(res.send.mock.calls[0])
    .toEqual([{
     message: `Internal server error:${err.toString()}`
    }]);
  });
 });
});