const express = require("express");
const router = express.Router();
const {findArtists, findArtistById} = require('../services/artist.service')

router.get('/search/:search', async (req, res) => {
  let artists = await findArtists(req.params.search)
  if (!artists) return res.status(404).json({ nosongsfound: 'No artists found' }) 
  res.json(artists)
});

router.get('/:id', async (req, res) => {
  let artist = await findArtistById({_id: req.params.id})
  if (!artist) return res.status(404).json({ nosongsfound: 'No artists found' }) 
  res.json(artist)
});

router.get('/', async (req, res) => {
  let artists = await findArtists()
  if (!artists) return res.status(404).json({ nosongsfound: 'No artists found' }) 
  res.json(artists)
});

module.exports = router;
