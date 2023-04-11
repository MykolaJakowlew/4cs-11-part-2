const { Schema, model } = require('mongoose');

const schema = new Schema({
 price: { type: Number, required: true },
 isAvailable: { type: Boolean, default: false }
});

const Dishes = new model('dishes', schema, 'dishes');

module.exports = { Dishes };