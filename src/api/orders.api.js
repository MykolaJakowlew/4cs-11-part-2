const { Router } = require('express');

const { wrapperApi } = require('../shared/wrapperApi');
const { orders } = require('./handlers');

const router = Router();

router.post('/orders', wrapperApi(orders.createOrder));
router.patch('/orders/:_id', wrapperApi(orders.updateOrder));
router.patch('/orders/:_id/dishes', wrapperApi(orders.addDishInOrder));
router.delete('/orders/:_id/dishes', wrapperApi(orders.removeDishFromOrder));

router.get('/orders', wrapperApi(orders.getOrders));
router.get('/orders/:_id', wrapperApi(orders.getOrder));

module.exports = { router };