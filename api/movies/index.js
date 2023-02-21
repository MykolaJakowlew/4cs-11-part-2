const { Router } = require('express');
const { Movies } = require('../../models/movies');
const Middleware = require('./middleware');

const router = Router();

/**
 * GET http://localhost:8080/movies?year=2000&skip=10&limit=10&imdb_rating=5&period_year=2000,2005
 */
router.get("/movies", async (req, res) => {
 // const year = req.query.year;
 const {
  year,
  imdb_rating,
  period_year,
  skip = 0,  // default value 0
  limit = 10 // default value 10
 } = req.query;

 const queryDb = {};

 if (year) {
  /**
   * $gte -- більше або рівне
   * $gt -- більше
   * $lte -- менше або рівне
   * $lt -- менше
   */
  queryDb.year = { $gte: year }; // більше або рівне
 }

 if (imdb_rating) {
  queryDb["imdb.rating"] = { $gte: imdb_rating };
 }

 if (period_year) {
  if (year) {
   return res.status(400).send({
    message: 'Request can not contain both field: year,period_year'
   });
  }
  // period_year => 2000,2005
  // period_year.split(',') => ["2000", "2005"]
  const [from, to] = period_year.split(',').map(e => parseInt(e, 10));
  // from => 2000
  // to   => 2005
  if (from > to) {
   return res.status(400).send({
    message: `Parameter period_year can not have first number bigger than second number`
   });
  }
  queryDb.year = { $gte: from, $lte: to };
 }

 console.debug(`movies query:${JSON.stringify(queryDb)}`);
 const docs = await Movies.find(queryDb).skip(skip).limit(limit);

 return res.status(200).send(docs);
});

router.patch("/movies/:_id",
 Middleware.checkIfExists,
 async (req, res) => {
  const { _id } = req.params;
  const { title, year } = req.body;

  const update = {};
  // let isUpdate = false;
  if (title) {
   // isUpdate = true;
   update.title = title;
  }

  if (year) {
   // isUpdate = true;
   update.year = year;
  }

  // if (!isUpdate) {
  //  return res.status(400).send({ message: 'Not found fields for update' });
  // }

  /**
   * Object.keys(update) => повертає масив назв ключів
   * Object.keys({ a: 56, b: 67, c: { f: 34 } }) => ["a", "b", "c"]
   * Object.keys({}) => []
   * Object.values({ a: 56, b: 67, c: { f: 34 } }) => [56, 67, { f: 34 }]
   * 
   */

  if (Object.keys(update).length == 0) {
   return res.status(400).send({ message: 'Not found fields for update' });
  }

  const doc = await Movies.findByIdAndUpdate(
   _id,
   { $set: update }
  );

  // const doc = await Movies.findByIdAndUpdate(
  //  _id,
  //  { $set: { title } }
  // );

  return res.status(200).send(doc);
 });


// GET /movies?a=67&b=78... 
router.get("/movies/:_id", (req, res) => {
 const { a, b } = req.query;
 const { _id } = req.params;
});

router.patch("/movies/:_id/directors",
 Middleware.checkIfExists,
 async (req, res, next) => {
  const { director } = req.body;
  if (!director) {
   return res.status(400).send({ message: 'Parameter director is required' });
  }
  const { doc } = req.extraParameters;
  if (doc.directors.includes(director)) {
   return res.status(400).send({
    message: `Element by _id:${_id} already have director:${director}`
   });
  }

  return next();
 },
 async (req, res) => {
  const { _id } = req.params;
  const { director } = req.body;
  const doc = await Movies.findByIdAndUpdate(
   _id,
   {
    $set: {
     directors: { $push: director }
    }
   }
  );

  return res.status(200).send(doc);
 });

router.delete("/movies/:_id/directors",
 Middleware.checkIfExists,
 async (req, res, next) => {
  const { director } = req.body;
  if (!director) {
   return res.status(400).send({ message: 'Parameter director is required' });
  }
  const { doc } = req.extraParameters;
  if (!doc.directors.includes(director)) {
   return res.status(400).send({
    message: `Element by _id:${_id} not have director:${director}`
   });
  }

  return next();
 },
 async (req, res) => {
  const { _id } = req.params;
  const { director } = req.body;
  const doc = await Movies.findByIdAndUpdate(
   _id,
   {
    $set: {
     directors: { $pull: director }
    }
   }
  );

  return res.status(200).send(doc);
 });

module.exports = { router };