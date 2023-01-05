const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
const {hashPassword} = require('../helpers/bcrypt')
const {findUser, createUser} = require('../services/user.service')

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  //TODO - Why does this take in a user and return a user?
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    date: req.user.date,
    birthdate: req.user.birthdate,
    likedSongs: req.user.likedSongs,
    playlists: req.user.playlists,
    likedAlbums: req.user.likedAlbums,
  });
})

router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);
  let {username, email, birthdate, password} = req.body

  let duplicateEmail = await findUser({ email })
  if (duplicateEmail) return res.status(400).json({ email: "A user has already registered with this email address" })
  
  let duplicateUsername = await findUser({ username })
  if (duplicateUsername) return res.status(400).json({ username: "Username is taken" })
  
  // Otherwise create a new user
  req.body.password =  await hashPassword(password)
  const newUser = await createUser(req.body)
  if (!newUser) return res.status(400)
  res.json(newUser)
})


router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        // return res.status(404).json({login: 'This user does not exist'});
        // }
        User.findOne({ username: req.body.email })
          .then(user => {
            if (!user) {
              return res.status(404).json({ login: 'Incorrect username or password.' });
            }
            bcrypt.compare(password, user.password)
              .then(isMatch => {
                if (isMatch) {
                  const payload = { id: user.id, username: user.username };

                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    // Tell the key to expire in one hour
                    { expiresIn: 3600 },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: 'Bearer ' + token
                      });
                    });
                } else {
                  return res.status(400).json({ login: 'Incorrect username or password.' });
                }
              })

          })
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, username: user.username };

            jwt.sign(
              payload,
              keys.secretOrKey,
              // Tell the key to expire in one hour
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({ login: 'Incorrect username or password' });
          }
        })

    })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => { res.json(user) })
    .catch(err => res.status(404).json({ nouserfound: 'No user found with that ID' }));
})

router.get("/:id/likedsongs", (req, res) => {
  User.findById(req.params.id)
    .populate("likedSongs")
    .then(user => {
      res.json(user.likedSongs)
    })
    .catch(err => res.status(404).json({ nouserfound: "No user found" }));
});

router.get("/:id/playlists", async (req, res) => {
  const playlistsObj = {};
  const user = await User.findById(req.params.id)
    .populate({
      path: "playlists",
      populate: "songs" 
    })
    .catch(err => res.status(404).json({ nouserfound: "No user found" }));
  const playlists = user.playlists;
  for (let index = playlists.length - 1; index > -1; index--) {
    const playlist = playlists[index].toJSON();
    playlistsObj[playlist._id] = playlist;
  }
  res.json(playlistsObj);
});

module.exports = router;


