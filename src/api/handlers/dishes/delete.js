const { Types } = require('mongoose');
const { Dishes } = require('../../../models');

module.exports.deleteDish = async (req, res) => {
 const { _id } = req.params;

 await Dishes.deleteOne({ _id: Types.ObjectId(_id) });

 return res.status(200).send();
};