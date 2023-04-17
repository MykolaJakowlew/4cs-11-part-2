const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
 tableId: { type: Number, required: true, unique: true },
 waiterId: { type: Types.ObjectId },
 orderId: { type: Types.ObjectId }
});

const Tables = new model('tables', schema, 'tables');

module.exports = { Tables };