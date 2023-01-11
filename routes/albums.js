const express = require("express");
const router = express.Router();

const {
  searchAlbums,
  getAllAlbums
} = require("../services/album.service");

const User = require('../models/User');
const Artist = require('../models/Artist');
const Album = require('../models/Album');

router.get('/search/:search', async (req, res) => {
  const albums = await searchAlbums(req.params.search)
  res.json(albums)
});

router.get('/', async (req, res) => {
    const albums = await getAllAlbums()
    if (!albums) res.status(404).json({ noalbumsfound: "No albums found"})
    res.json(albums)
});

router.get('/:id', async (req, res) => {
  const album = await getAlbumById(req.params.id)
  if (!album) res.status(404).json({ noalbumfound: "No albums found"})
  res.json(album)
});

router.post('/new', async (req, res) => {
  let newAlbum = await createNewAlbum(req.body) 
  return newAlbum
});

router.patch('/like/:id', (req, res) => {
  const likeData = {
    albumId: req.params.id,
    userId: req.body.userId,
  }
  //TODO update LIKED structure to be a dictionary
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