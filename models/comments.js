const { Schema, Types, model } = require('mongoose');


const schema = new Schema({
 name: { type: String, required: true },
 email: { type: String, required: true },
 movie_id: { type: Types.ObjectId },
 text: { type: String },
 date: { type: Date }
});

const Comments = new model('comments', schema);

module.exports = { Comments };