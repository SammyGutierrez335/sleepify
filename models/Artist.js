const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "songs"
    }
  ],
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: "albums"
    }
  ],
  imageUrl: {
    type: String,
    required: true
  }
});

ArtistSchema.statics.addSong = (artistId, songId) => {
  const Artist = mongoose.model("artists");
  const Song = mongoose.model("songs");
  return Artist.findById(artistId).then(artist => {
    return Song.findById(songId).then(song => {
      artist.songs.push(song);
      return Promise.all([artist.save(), song.save()]).then(
        ([artist, song]) => song
      );
    });
  });
};

ArtistSchema.statics.addAlbum = (artistId, albumId) => {
  const Artist = mongoose.model("artists");
  const Album = mongoose.model("albums");
  return Artist.findById(artistId).then(artist => {
    return Album.findById(albumId).then(album => {
      artist.albums.push(album);
      return Promise.all([artist.save(), album.save()]).then(
        ([artist, song]) => artist
      );
    });
  });
};

module.exports = mongoose.model("artists", ArtistSchema);