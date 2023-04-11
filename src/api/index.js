const { Router } = require('express');

const DishesAPI = require('./dishes.api');

const router = Router();

router.use(DishesAPI.router);

module.exports = { router };