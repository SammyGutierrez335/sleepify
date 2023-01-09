const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  playlists: [
    {
      type: Schema.Types.ObjectId,
      ref: "playlists",
    }
  ],
  likedSongs: [
    {
      type: Schema.Types.ObjectId,
      ref: "songs",
      autoPopulate: true
    }
  ],
  likedAlbums: [
    {
      type: Schema.Types.ObjectId,
      ref: "albums",
      autoPopulate: true
    }
  ]
});

//stores playlist onto users table upon post request of a playlist
UserSchema.statics.addPlaylist = (playlistId, userId) => {
  const Playlist = mongoose.model("playlists");
  const User = mongoose.model("User");

  return Playlist.findById(playlistId).then(playlist => {
    return User.findById(userId).then(user => {
      user.playlists.push(playlist);
      return Promise.all([user.save(), playlist.save()]).then(
        ([user, playlist]) => user
      );
    });
  });
};

UserSchema.statics.deletePlaylist = (playlistId, userId) => {
  const Playlist = mongoose.model("playlists");
  const User = mongoose.model("User");

  return User.findById(userId).then(user => {
    return Playlist.findById(playlistId).then(playlist => {
      user.playlists.delete(playlist);
      return Promise.all([user.save(), playlist.save()])
        .then(([user, playlist]) => user)
    })
  })
}

module.exports = User = mongoose.model("User", UserSchema);
