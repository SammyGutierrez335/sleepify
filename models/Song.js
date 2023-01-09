const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// db.songs.insertMany([
//   { "title": "All At Once", "genre": "Soft Rock", "artist": "5e42ca083ce1c82e3858d128", "imageUrl": "https://sleepify-dev.s3.us-east-2.amazonaws.com/artists/jack_johnson.jpg", "songUrl": "https://sleepify-dev.s3.us-east-2.amazonaws.com/01+All+At+Once.mp3"},
//   { "title": "Father and Son", "genre": "Classic Rock", "artist": "5e42ca083ce1c82e3858d12a", "imageUrl": "https://sleepify-dev.s3.us-east-2.amazonaws.com/artists/cat_stevens.jpg", "songUrl": "https://sleepify-dev.s3.us-east-2.amazonaws.com/Cat+Stevens+-+02+-+Father+And+Son.mp3" },
//   { "title": "I Got You", "genre": "Soft Rock", "artist": "5e42ca083ce1c82e3858d128", "imageUrl": "https://sleepify-dev.s3.us-east-2.amazonaws.com/artists/jack_johnson.jpg", "songUrl": "https://sleepify-dev.s3.us-east-2.amazonaws.com/Jack+Johnson+-+01+-+I+Got+You.mp3"},
//   { "title": "New Light", "genre": "Alternative Rock", "artist": "5e42ca083ce1c82e3858d129", "imageUrl": "https://sleepify-dev.s3.us-east-2.amazonaws.com/artists/john_mayer.jpg", "songUrl": "https://sleepify-dev.s3.us-east-2.amazonaws.com/John+Mayer+-+01+-+New+Light.mp3" }
// ]);

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
  // usersLiked: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "users"
  //   }
  // ]
});

module.exports = mongoose.model("songs", SongSchema);
