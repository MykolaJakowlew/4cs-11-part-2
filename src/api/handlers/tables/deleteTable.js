const mongoose = require('mongoose');
const { Tables } = require('../../../models');

module.exports.deleteTable = async (req, res) => {
 const { _id } = req.params;

 const table = await Tables.findOneById(_id);
 if (!table) {
  return res.status(400)
   .send({ message: `Table with _id ${_id} was not found` });
 }

 if (table.orderId != null) {
  return res.status(400)
   .send({ message: `Table with _id ${_id} has active order` });
 }

 await Tables.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

 return res.status(200).send();
};