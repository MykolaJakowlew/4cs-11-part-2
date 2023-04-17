const { Tables } = require('../../../models');

/**
 * 
 * @param {Object} req 
 * @param {Object} req.query 
 * @param {'true' | 'false' | undefined} req.query.isFree 
 * @param {*} res 
 */
module.exports.getTables = async (req, res) => {
 const { isFree } = req.query;

 if (isFree === undefined) {
  const docs = await Tables.find();
  return res.status(200).send(docs);
 }

 if (!['true', 'false'].includes(isFree)) {
  return res.status(400)
   .send({
    message: 'Parameter isFree can have only one value from the nest list: true, false'
   });
 }

 const query = isFree === 'true'
  ? { orderId: { $exists: false } }
  : { orderId: { $exists: true } };

 const docs = await Tables.find(query);
 return res.status(200).send(docs);
};