const { Tables } = require('../../../models');

module.exports.createTable = async (req, res) => {
 const { tableId } = req.body;

 if (tableId == null) {
  return res.status(400).send({
   message: 'Parameter tableId is required'
  });
 }

 const table = await Tables.findOne({ tableId });
 if (table) {
  return res.status(400).send({
   message: `Table with id ${tableId} already exists`
  });
 }

 const newTable = new Tables({ tableId });
 try {
  const doc = await newTable.save();
  return res.status(200).send(doc);
 } catch (err) {
  console.error(err);
  if (err.code == 11000) {
   return res.status(400).send({
    message: `Table with id ${tableId} already exists`
   });
  }

  return res.status(500).send({ message: err.toString() });
 }
};