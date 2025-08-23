const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {hashPassword} = require('../helpers/bcrypt')
const {findUser, createUser} = require('../services/user.service')

const validateRegisterInput = require('../helpers/validation/register');
const validateLoginInput = require('../helpers/validation/login');

router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);
  let {username, email, password} = req.body
  let duplicateEmail = await findUser({ email })
  if (duplicateEmail) return res.status(400).json({ email: "A user has already registered with this email address" })
  
  let duplicateUsername = await findUser({ username })
  if (duplicateUsername) return res.status(400).json({ username: "Username is taken" })
  
  // Otherwise create a new user
  password =  await hashPassword(password)
  const newUser = await createUser({username, email, password})
  if (!newUser) return res.status(500)
  res.json(newUser)
})


router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  let {email, password} = req.body;
  let user = await findUser({email})  
  if (!user) return res.status(404).json({login: 'Unable to find a user with the credentials provided'});
  let isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ login: 'Incorrect credentials.' })

  const payload = { id: user.id, username: user.username };

  jwt.sign(
    payload,
    process.env.SECRET_OR_KEY,
    // Tell the key to expire in one hour
    { expiresIn: 3600 },
    (err, token) => {
      res.json({
        success: true,
        token: 'Bearer ' + token
      });
    });
})

router.get('/:id', async (req, res) => {
  let user = await findUser({_id: req.params.id})
  if (!user) res.status(404).json({ nouserfound: 'No user found with that ID' })
  res.json(user) 
})

router.get("/:id/likedsongs", async (req, res) => {
  let user = await findUser({_id: req.params.id})
  if (!user) res.status(404).json({ nouserfound: 'No user found with that ID' })
  return res.json(user.likedSongs)
});

router.get("/:id/playlists", async (req, res) => {
  const playlistsObj = {};
  const user = await findUser({_id: req.params.id})
  .catch(err => res.status(404).json({ nouserfound: "No user found" }));
  
    const playlists = user.playlists;
  for (let index = playlists.length - 1; index > -1; index--) {
    const playlist = playlists[index].toJSON();
    playlistsObj[playlist._id] = playlist;
  }
  
  res.json(playlistsObj);
});

module.exports = router;


