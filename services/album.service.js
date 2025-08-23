const Album = require('../models/Album');

const searchAlbums = async text => {
    const albumObj = {};
    const albumRegex = new RegExp(text, 'i');

    let albums = await Album.find({ title: { $regex: albumRegex + '.*', $options: 'i' } })
    .limit(4)
    .catch(err => res.status(404).json({ noalbumsfound: 'No albums found' }));
    
    for (let index = albums.length - 1; index > -1; index--) {
      const album = albums[index].toJSON();
      albumObj[album._id] = album
    }
}

const getAllAlbums = async () => {
  return await Album.find().sort({ date: -1 })
}

const getAlbumById = async id => {
  return await Album.findById(req.params.id)
}

const createNewAlbum = (async ({title, year, artist, imageUrl}) => {
  const newAlbum = new Album({ title, year, artist, imageUrl});

  newAlbum.save().then(album => artist.addAlbum(album.artist, album.id));
})

module.exports = {
    searchAlbums,
    getAllAlbums,
    getAlbumById,
    createNewAlbum
}