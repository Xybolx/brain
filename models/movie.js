const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
      type: String,
      index: {
          unique: true
      }
    },

    src: {
      type: String
    },

    director: {
      type: String
    },

    genre: {
      type: String
    },

    released: {
      type: String
    },

    plot: {
      type: String
    },

    date: {
      type: Date,
      default: Date.now
    }
    
  });

  const Movie = mongoose.model("Movie", movieSchema);

  module.exports = Movie;