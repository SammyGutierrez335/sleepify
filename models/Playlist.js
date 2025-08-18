const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "songs"
    }
  ]
});

PlaylistSchema.statics.addSongToPlaylist = (playlistId, songId) => {
  const Playlist = mongoose.model("playlists");
  const Song = mongoose.model("songs");
  return Playlist.findById(playlistId).then(playlist => {
    return Song.findById(songId).then(song => {
      playlist.songs.push(song);
      return Promise.all([playlist.save(), song.save()]).then(
        ([playlist, song]) => playlist
      );
    });
  });
};



module.exports = mongoose.model("playlists", PlaylistSchema);
