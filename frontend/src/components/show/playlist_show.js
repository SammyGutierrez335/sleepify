import React from "react";
import { Link } from 'react-router-dom';

class PlaylistShow extends React.Component {

  constructor(props) {
    super(props);
    this.showSongs = this.showSongs.bind(this);
    this.playAll = this.playAll.bind(this);
    this.playTrack = this.playTrack.bind(this);
  }


  componentDidMount() {
    this.props.fetchPlaylist(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchPlaylist(this.props.match.params.id);
    }
  }


  playAll(e) {
    e.preventDefault();
    console.log("playingAll")
    this.props.playAllTracks(this.props.playlist.songs);
  }

  playTrack(track) {
    return e => {
      e.stopPropagation();
      this.props.playTrack(track);
    }
  }

  showSongs() {
    if (!this.props.playlist) return (null);
    const songs = Object.values(this.props.playlist.songs);
    if (songs.length === 0) return (
      <div
        className="ps-empty-container">
        <i className="fas fa-bed"></i>
          <h1>It's a bit empty here...</h1>
          <h3>Let's find some nice songs to relax to</h3>
          <Link to="/open/search"><div className="ps-search">Search Songs</div></Link>
      </div>
    )
    return songs.map((song, i) => {
      return (
        <div
          key={i}
          className={`pq-track-container`}>
          <i onClick={this.playTrack(song)} className="fas fa-bed"></i>
          <div className="pq-details">
            <span className="pq-title">
              {song.title}
            </span>
            <Link to={`/open/artist/${song.artist._id}`}><span className="pq-artist">
              {song.artist.name}
            </span></Link>
          </div>
        </div>
      )
    })
  }

  render() {
    const { playlist, username } = this.props;
    if (!playlist) return null;
    const hasSong = playlist.songs && playlist.songs.length;
    return (
      <div className="open-player-body">
        <div className="ps-container">
          <div className="ps-left">
            <img className="ps-image" src={hasSong ? playlist.songs[0].imageUrl : "/static/images/playlist.png"} alt=""/>
            <h1>{playlist.title}</h1>
            <h2>{username}</h2>
            {hasSong ? <button
              onClick={this.playAll}
              className="album-show-play">
                PLAY
            </button> : <button className="playlist-show-play disabled" id="disabled">PLAY</button> }
          </div>

          <div className="ps-right">
              {this.showSongs()}
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistShow;
