const express = require("express");
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const Song = require('../../models/Song');
const Artist = require('../../models/Artist');
const keys = require('../../config/keys');
const validateSongInput = require('../../validation/song');

router.get('/search/:search', (req, res) => {
  const songRegex = new RegExp(req.params.search, 'i');
  // Song.find({ title: songRegex })
  Song.find({ title: { $regex: req.params.search + '.*', $options: 'i'  }})
    .populate('artist')
    .sort({ date: -1 })
    .then(songs => res.json(songs))
    .catch(err => res.status(404).json({ nosongsfound: 'No songs found' }));
});

router.get('/', (req, res) => {
  Song.find()
    .populate('artist')
    .sort({ date: -1 })
    .then(songs => res.json(songs))
    .catch(err => res.status(404).json({ nosongsfound: 'No songs found' }));
});

router.get('/:id', (req, res) => {
  Song.findById(req.params.id)
    .then(song => {
          res.json(song)
        })
    .catch(err =>
      res.status(404).json({ nosongfound: 'No song found with that ID' })
    );
});

router.post('/new', (req, res) => {
  // passport.authenticate('jwt', { session: false }),
  // (req, res) => {
  //   const { errors, isValid } = validateSongInput(req.body);

  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }

    const newSong = new Song({
      title: req.body.title,
      genre: req.body.genre,
      artist: req.body.artist,
      imageUrl: req.body.imageUrl,
      songUrl: req.body.songUrl
    });

    newSong.save().then(song => Artist.addSong(song.artist, song.id));
  }
);

module.exports = router;
