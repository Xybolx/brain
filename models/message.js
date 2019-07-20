const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: {
      type: Array,
      required: true,
    },
    message: {
      type: String,
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