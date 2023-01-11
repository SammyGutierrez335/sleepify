const Playlist = require("../models/Playlist");

let findPlaylist = async query => {
    return await Playlist.find(query).populate({
        path: 'songs',
        populate: { path: 'artist' }
      })
}

module.exports = {
    findPlaylist
}