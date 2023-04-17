const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
 createdAt: { type: Date, default: Date.now() },
 isOpen: { type: Boolean, default: true },
 dishes: {
  type: [{
   dishId: { type: Types.ObjectId, required: true },
   quantity: { type: Number, default: 1 },
   price: { type: Number, required: true }
  }]
 }
});

const Orders = new model('orders', schema, 'orders');

module.exports = { Orders };