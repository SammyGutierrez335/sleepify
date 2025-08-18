const express = require("express");
const app = express();
const path = require("path");

const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const passport = require("passport");

//security headers
const helmet = require("helmet")

app.use(helmet())

const compression = require('compression')
app.use(compression())

//enables cross-origin resource sharing (frontend to backend)
const cors = require("cors")
app.use(cors())

const songs = require("./routes/songs");
const users = require("./routes/users");
const artists = require("./routes/artists");
const albums = require("./routes/albums");
const playlists = require("./routes/playlists");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/songs", songs);
app.use("/api/artists", artists);
app.use("/api/albums", albums);
app.use("/api/playlists", playlists);
app.use("/static", express.static(path.join(__dirname, "frontend", "public")));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

