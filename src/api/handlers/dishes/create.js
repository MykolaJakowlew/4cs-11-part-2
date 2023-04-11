const { Dishes } = require('../../../models');

module.exports.createDish = async (req, res) => {
 const { price, isAvailable = true } = req.body;

 const dish = new Dishes({ price, isAvailable });
 const doc = await dish.save();

 return res.status(200).send(doc);
};