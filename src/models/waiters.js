const { Schema, model } = require('mongoose');

const schema = new Schema({
 firstName: { type: String, required: true },
});

const Waiters = new model('waiters', schema, 'waiters');

module.exports = { Waiters };