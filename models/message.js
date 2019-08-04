const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: {
      type: String,
      required: true
    },
    avatar: {
      type: Array
    },
    message: {
      type: String,
      required: true
    },
    movie: {
      type: String
    },
    result: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
      index: {
        unique: true
      }
    },
  });

  const Message = mongoose.model("Message", messageSchema);

  module.exports = Message;