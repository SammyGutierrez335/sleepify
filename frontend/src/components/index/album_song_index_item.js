import React from 'react';
import { Link } from 'react-router-dom';
import { playTrack } from '../../actions/player_queue_actions';

class AlbumSongIndexItem extends React.Component {
    constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this);
  };

  handleToggle = (e, songId) => {
    e.preventDefault();

    let songOptions = document.getElementById(songId);

    if (songOptions) {
      songOptions.classList.toggle("show");
    }
  }
  render() {
    const song = this.props.song;
    return (
      <div className="song" onClick={(e) => this.props.playTrack(song)}>
        <li><img className="song-photo" src="static/images/musicsymbol.png" /></li>
        <li className="song-item-info">
          <p className="song-title">{song.title}</p>
          <Link to={`/open/artist/${song.artist._id}`} id={song.artist._id}>
            <p className="song-artist">{song.artist.name}</p>
          </Link>
          </li>
          <div className="play-button"><i class="fas fa-play-circle"></i></div>
          <div className="options-song" onClick={(e) => this.handleToggle(e, song._id)}><i class="fa fa-ellipsis-h" aria-hidden="true"></i>
            <div className="options-popup"><div className="optionstext" id={song._id}>
              <p className="option-choice" onClick={(e) => this.props.openModal("choosePlaylist")}>Add To Playlist</p>
              <p className="option-choice">Add To Liked Songs</p>
              <p className="option-choice">Play Song</p>
            </div>
            </div>
          </div>

      </div>
    )
  }
};

export default AlbumSongIndexItem; 