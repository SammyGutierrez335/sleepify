const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const validatePlaylistInput = require("../validation/playlist");

router.post("/create", (req, res) => {
  const { errors, isValid } = validatePlaylistInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPlaylist = new Playlist({
    title: req.body.title,
    user: req.body.user
  });
  newPlaylist
    .save()
    .then(playlist => User.addPlaylist(playlist._id, playlist.user));

  return res.json({
    success: true,
    playlist: newPlaylist
  });
});


router.get('/:id', (req, res) => {
  Playlist.findById(req.params.id)
    .populate({
      path: 'songs',
      populate: { path: 'artist' }
    })
    .then(playlist => {
      res.json(playlist)
    })
    .catch(err =>
      res.status(404).json({ noplaylistfound: 'No playlist found with that ID' })
    );
});

router.delete('/delete/:id', (req, res) => {
  Playlist.findByIdAndDelete(req.params.id)
    .then(playlist => {
      User.findByIdAndUpdate(playlist.user, { $pull: { playlists: req.params.id } })
        .then(user => {
          return res.json(playlist)
        })
        .catch(err =>
          res.status(404).json({ nouserfound: 'No user found with that ID' }))
    })

    .catch(err => {
      res.status(404).json({ noplaylistfound: 'No playlist found with that ID' })
    })
})

router.patch('/addto/:id', (req, res) => {
  let playlistId = req.params.id;
  let songId = req.body.songId;
  Playlist.addSongToPlaylist(playlistId, songId)
    .then(playlist => playlist)
})


router.patch('/rename/:id', (req, res) => {
  Playlist.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true}
  )
    .then(playlist => {
      res.json(playlist)
    })
    .catch(err =>
      res.status(404).json({ noplaylistfound: 'No playlist found with that ID' })
    );
});

module.exports = router;
