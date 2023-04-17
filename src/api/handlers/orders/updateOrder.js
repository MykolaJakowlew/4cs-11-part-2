const { Types } = require('mongoose');
const { Orders, Dishes } = require('../../../models');

module.exports.updateOrder = async (req, res) => {
 const { isOpen } = req.body;
 const { _id } = req.params;

 const order = await Orders.findOneAndUpdate(
  { _id: Types.ObjectId(_id) },
  { $set: { isOpen } },
  { isNew: true }
 );


 return res.status(200).send(order);
};

module.exports.addDishInOrder = async (req, res) => {
 const { dishId, quantity } = req.body;
 const { _id } = req.params;

 const doc = await Orders.findOneById(_id);
 if (!doc) {
  return res.status(400).send({
   message: `Order with id:${_id} was not found`
  });
 }

 if (!doc.isOpen) {
  return res.status(400).send({
   message: `Order with id:${_id} is already closed`
  });
 }

 if (quantity <= 0) {
  return res.status(400).send({
   message: `Parameter quantity has negative or zero quantity`
  });
 }

 const dish = await Dishes.findOne({ _id: Types.ObjectId(dishId) });
 if (!dish) {
  return res.status(400).send({
   message: `Dish with id:${dishId} was not found`
  });
 }

 if (!dish.isAvailable) {
  return res.status(400).send({
   message: `Dish with id:${dishId} is not available`
  });
 }

 const order = await Orders.findOneAndUpdate(
  { _id: Types.ObjectId(_id) },
  {
   $push: {
    dishes: {
     dishId,
     quantity,
     price: dish.price,
    }
   }
  },
  { isNew: true }
 );

 return res.status(200).send(order);
};

module.exports.removeDishFromOrder = async (req, res) => {
 const { dishId, dec } = req.body;
 const { _id } = req.params;

 const doc = await Orders.findOneById(_id);
 if (!doc) {
  return res.status(400).send({
   message: `Order with id:${_id} was not found`
  });
 }

 if (!doc.isOpen) {
  return res.status(400).send({
   message: `Order with id:${_id} is already closed`
  });
 }

 /**
  * dishes => [
  *  { dishId: 1, price: 2, quantity: 5 },
  *  { dishId: 1, price: 2, quantity: 7 },
  *  ...
  * ]
  */
 const dishes = doc.dishes.filter(e => e.dishId.toString() === dishId);
 if (!dishes.length) {
  return res.status(400).send({
   message: `Order with id:${_id} does not include dish with id ${dishId}`
  });
 }

 /**
  * dish => { dishId: 1, price: 2, quantity: 5 + 7 + ... }
  */
 const dish = dishes.reduce((acc, cur) => {
  acc.quantity += cur.quantity;
  return acc;
 }, { quantity: 0, price: dishes[0].price, dishId });

 if (dec > dish.quantity) {
  return res.status(400).send({
   message: `Order with id:${_id} does not include dish with id ${dishId} in count ${dec}. Actual count: ${dish.quantity}`
  });
 }

 dish.quantity -= dec;

 const newDishes = doc.dishes.filter(e => e.dishId.toString() !== dishId);

 if (dish.quantity != 0) {
  newDishes.push(dish);
 }

 const order = await Orders.findOneAndUpdate(
  { _id: Types.ObjectId(_id) },
  { $set: { dishes: newDishes } },
  { isNew: true }
 );

 return res.status(200).send(order);
};