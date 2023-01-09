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

// db.artists.insertMany([
//   { _id: "5e42ca083ce1c82e3858d128", name: "Jack Johnson", imageUrl: "https://sleepify-dev.s3.us-east-2.amazonaws.com/artists/leonbridges.png" },
//   { _id: "5e42ca083ce1c82e3858d129", name: "John Mayer", imageUrl: "https://sleepify-dev.s3.us-east-2.amazonaws.com/artists/janisjoplin.jpg" },
//   { _id: "5e42ca083ce1c82e3858d12a", name: "cat_stevens", imageUrl: "https://sleepify-dev.s3.us-east-2.amazonaws.com/artists/mymorningjacket.jpg" }
//  ]);
