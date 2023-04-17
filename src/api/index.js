const { Router } = require('express');

const DishesAPI = require('./dishes.api');
const OrdersAPI = require('./orders.api');
const TablesAPI = require('./tables.api');

const router = Router();

router.use(DishesAPI.router);
router.use(OrdersAPI.router);
router.use(TablesAPI.router);

module.exports = { router };