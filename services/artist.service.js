const Artist = require('../models/Artist');

const findArtists = async searchText => {
    let query = {}
    if (searchText) {
        query['name'] = { $regex: searchText + '.*', $options: 'i' }
    }

   return await Artist.find(query)
    .limit(4)
    .sort({ date: -1 })
}

const findArtistById = async id => {
    return await Artist.find({_id: id})
 }

module.exports = {
    findArtists,
    findArtistById
}