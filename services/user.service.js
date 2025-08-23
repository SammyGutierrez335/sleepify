const User = require('../models/User');

findUser = async query => User.findOne(query)
createUser = async (userData) => User.create(userData)

module.exports = {
    createUser,
    findUser,
}