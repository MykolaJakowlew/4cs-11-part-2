const { Orders } = require('../../../models');

module.exports.getOrders = async (req, res) => {
 const { isOpen } = req.query;

 if (isOpen === undefined) {
  const orders = await Orders.find();
  return res.status(200).send(orders);
 }

 const orders = await Orders.find({
  isOpen: isOpen === 'true' ? true : false
 });

 return res.status(200).send(orders);
};

module.exports.getOrder = async (req, res) => {
 const { _id } = req.params;

 const order = await Orders.findOneById(_id);
 if (!order) {
  return res.status(400).send({
   message: `Order with id:${_id} was not found`
  });
 }

 return res.status(200).send({
  ...order.toObject(),
  totalPrice: order.dishes.reduce((acc, cur) => {
   return acc + cur.quantity * cur.price;
  }, 0)
 });
};