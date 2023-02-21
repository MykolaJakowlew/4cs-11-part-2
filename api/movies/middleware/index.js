const { Movies } = require('../../../models/movies');

const checkIfExists = async (req, res, next) => {
 const { _id } = req.params;
 const doc = await Movies.findOne({ _id });
 if (!doc) {
  return res.status(400).send({
   message: `Element by _id:${_id} was not found`
  });
 }

 req.extraParameters = {
  doc
 };

 return next();
};

module.exports = { checkIfExists };