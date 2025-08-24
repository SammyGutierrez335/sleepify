const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Song = require('../models/Song');
const Artist = require('../models/Artist');
const Album = require('../models/Album');

router.get('/search/:search', async (req, res) => {
  const songRegex = new RegExp(req.params.search, 'i');
  const songObj = {};
  const songs = await Song.find({ title: { $regex: req.params.search + '.*', $options: 'i' } })
    .limit(4)
    .populate('artist')
    .catch(err => res.status(404).json({ nosongsfound: 'No songs found' }));
  for (let index = songs.length - 1; index > -1; index--) {
    const song = songs[index].toJSON();
    songObj[song._id] = song
  }
  res.json(songObj)
});

router.get('/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let searchGenre;
  if (genre === "softrock") {
    searchGenre = "Soft Rock";
  } else if (genre === "classicrock") {
    searchGenre = "Classic Rock";
  } else if (genre === "altrock") {
    searchGenre = "Alternative Rock";
  }
  const songObj = {};
  const songs = await Song.find({ genre: searchGenre })
    .limit(20)
    .populate('artist')
    .catch(err => res.status(404).json({ nosongsfound: 'No songs found' }));
  for (let index = songs.length - 1; index > -1; index--) {
    const song = songs[index].toJSON();
    songObj[song._id] = song
  }
  res.json(songObj)
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

  const newSong = new Song({
    title: req.body.title,
    genre: req.body.genre,
    artist: req.body.artist,
    album: req.body.album,
    imageUrl: req.body.imageUrl,
    songUrl: req.body.songUrl
  });

  newSong.save()
    .then(song => Artist.addSong(song.artist, song.id))
    .then(song => Album.addSongToAlbum(song.album, song.id));
}
);

router.patch('/like/:id', (req, res) => {
  const likeData = {
    songId: req.params.id,
    userId: req.body.userId
  }
  Song.findById(req.params.id)
    .then(song => {
      if (song) {
        User.findById(req.body.userId)
          .then(user => {
            if (user) {
              let isLiked = false
                user.likedSongs.forEach(song => {
                if (song._id.equals(req.params.id)) {
                  isLiked = true
                }
              })
              if (!isLiked) {
                user.likedSongs.push(likeData.songId)
                user.save();
                return res.json(likeData)
              } else {
                const newLikedSongs = user.likedSongs.filter(songId => {
                  console.log(songId)
                  songId !== req.params.id
                })

                console.log("unliking")
                user.likedSongs = newLikedSongs
                user.save();
                return res.json(likeData)
              }
            }
          })
      }
    });
});

module.exports = router;
