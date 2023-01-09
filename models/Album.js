const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artists",
    autopopulate: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "songs",
      autopopulate: true
    }
  ]
});

AlbumSchema.statics.addSongToAlbum = (albumId, songId) => {
  const Album = mongoose.model("albums");
  const Song = mongoose.model("songs");
  return Album.findById(albumId).then(album => {
    return Song.findById(songId).then(song => {
      album.songs.push(song);
      return Promise.all([album.save(), song.save()]).then(
        ([album, song]) => album
      );
    });
  });
};

module.exports = mongoose.model("albums", AlbumSchema);