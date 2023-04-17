const { Types } = require('mongoose');
const { Orders, Dishes } = require('../../../models');

module.exports.createOrder = async (req, res) => {
 const { dishes = [] } = req.body;
 if (dishes.length) {
  const dishDocs = await Dishes.find({
   _id: { $in: dishes.map(({ dishId }) => Types.ObjectId(dishId)) }
  });

  for (const dish of dishes) {
   if (dish.quantity <= 0) {
    return res.status(400).send({
     message: `Dish with dishId:${dish.dishId} has negative or zero quantity`
    });
   }

   const elem = dishDocs.find(e => e._id.toString() === dish.dishId);
   if (!elem) {
    return res.status(400).send({ message: `Dish with dishId:${dish.dishId} was not found` });
   }

   if (!elem.isAvailable) {
    return res.status(400).send({
     message: `Dish with dishId:${dish.dishId} is not available`
    });
   }

   const { price } = elem;
   dish.price = price;
  }
 }

 const order = new Orders({ dishes });
 const doc = await order.save();

 return res.status(200).send(doc);
};