const express = require("express");
const router = express.Router();

const {
  searchAlbums,
} = require("../services/album.service");

const User = require('../models/User');
const Artist = require('../models/Artist');
const Album = require('../models/Album');

router.get('/search/:search', async (req, res) => {
  const albums = searchAlbums(req.params.search)
  res.json(albums)
});

router.get('/', (req, res) => {
  Album.find()
    .populate('songs')
    .sort({ date: -1 })
    .then(albums => res.json(albums))
    .catch(err => res.status(404).json({ noalbumsfound: 'No albums found' }));
});

router.get('/:id', (req, res) => {
  Album.findById(req.params.id)
    .populate('songs')
    .populate('artist')
    .then(album => {
      res.json(album)
    })
    .catch(err =>
      res.status(404).json({ noalbumfound: 'No album found with that ID' })
    );
});

router.post('/new', (req, res) => {
  
  const newAlbum = new Album({
    title: req.body.title,
    year: req.body.year,
    artist: req.body.artist,
    imageUrl: req.body.imageUrl
  });

  newAlbum.save().then(album => Artist.addAlbum(album.artist, album.id));
});

router.patch('/like/:id', (req, res) => {
  const likeData = {
    albumId: req.params.id,
    userId: req.body.userId,
  }
  User.findById(req.body.userId)
    .then(user => {
      if(user) {
        if (!user.likedAlbums.includes(req.params.id)) {
          user.likedAlbums.push(req.params.id)
          user.save();
          return res.json(likeData)
        } else {
          const songIdx = user.likedAlbums.indexOf(req.params.id);
          user.likedAlbums.splice(songIdx, 1);
          user.save();
          return res.json(likeData)
        }
      }
    });
});

module.exports = router;