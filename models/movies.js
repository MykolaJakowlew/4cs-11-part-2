const { Schema, model } = require('mongoose');

const schema = new Schema({
 plot: { type: String },
 genres: { type: [String] },
 runtime: { type: Number },
 cast: { type: [String] },
 num_mflix_comments: { type: Number },
 poster: { type: String },
 title: { type: String },
 fullplot: { type: String },
 rated: { type: String },
 lastupdated: { type: String },
 type: { type: String },
 languages: { type: [String] },
 released: { type: Date },
 directors: { type: [String] },
 awards: {
  wins: { type: Number },
  nominations: { type: Number },
  text: { type: String },
 },
 year: { type: Number },
 countries: { type: [String] },
 imdb: {
  rating: { type: Number },
  votes: { type: Number },
  id: { type: Number },
 },
 tomatoes: {
  dvd: { type: Date },
  lastUpdated: { type: Date },
  viewer: {
   rating: { type: Number },
   numReviews: { type: Number },
   meter: { type: String },
  },
 },
});

const Movies = new model('movies', schema);

module.exports = { Movies };