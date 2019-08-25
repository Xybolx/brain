const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  avatar: {
    avatarStyle: String,
    topType: String,
    accessoriesType: String,
    hairColor: String,
    facialHairType: String,
    facialHairColor: String,
    clotheType: String,
    clotheColor: String,
    graphicType: String,
    eyeType: String,
    eyebrowType: String,
    mouthType: String,
    skinColor: String,
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