const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artists"
  },
  imageUrl: {
    type: String,
    required: true
  },
  songUrl: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "album"
  }
});

module.exports = mongoose.model("songs", SongSchema);
