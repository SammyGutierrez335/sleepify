const express = require("express");
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Song = require('../models/Song');
const Artist = require('../models/Artist');
const keys = require('../config/keys');

router.get('/search/:search', (req, res) => {
  Artist.find({ name: { $regex: req.params.search + '.*', $options: 'i' } })
    .limit(4)
    .populate('songs')
    .sort({ date: -1 })
    .then(artists => res.json(artists))
    .catch(err => res.status(404).json({ nosongsfound: 'No artists found' }));
});

router.get('/:id', (req, res) => {
  Artist.findById(req.params.id)
    .populate('songs')
    .then(artist => {
      res.json(artist)
    })
    .catch(err =>
      res.status(404).json({ nosongfound: 'No artist found with that ID' })
    );
});

router.get('/', (req, res) => {
  Artist.find()
    .sort({ date: -1 })
    .then(artists => res.json(artists))
    .catch(err => res.status(404).json({ noartistsfound: 'No artists found' }));
});

module.exports = router;
