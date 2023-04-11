const { Router } = require('express');
const { Types } = require('mongoose');
const { Dishes } = require('../models');
const { wrapperApi } = require('../shared');

const { dishes } = require('./handlers');
/**
 * Collection <dishes>
3. Get the list of dishes
    GET /dishes?price={"gt": value,"lt": value}&isAvailable=true|false
    response: array of docs from DB
4. Delete dishes
    DELETE /dishes/:_id
    response: empty
 */
const router = Router();

const priceMiddleware = ({ isOptional }) => (req, res, next) => {
 const { price } = req.body;
 const needCheck = isOptional ? price != null : true;
 if (needCheck && price <= 0) {
  return res.status(400).send({
   message: `Price must be more than 0`
  });
 }
 return next();
};

router.post('/dishes',
 priceMiddleware({ isOptional: false }),
 wrapperApi(dishes.createDish)
);

router.patch('/dishes/:_id ',
 priceMiddleware({ isOptional: true }),
 wrapperApi(dishes.updateDish));

// 3. Get the list of dishes
// GET /dishes?price={"gt": value,"lt": value}&isAvailable=true|false
// response: array of docs from DB
router.get();
module.exports = { router };