import React from "react";

class ChoosePlaylist extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.props.closeModal.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  addSong(e, playlist) {
    e.preventDefault();
    this.props.addSongToPlaylist(this.props.songId, playlist);
    this.props.closeModal();
    this.props.fetchUserPlaylists(this.props.currentUser.id); 
  }

  handleClick(e) {
    e.preventDefault();
    this.props.closeModal();
  }

  render() { 
    let liPlaylists; 
    if (this.props.playlists) {
      liPlaylists = Object.values(this.props.playlists).map(playlist =>  {
        let count = playlist.songs.length === 1 ? playlist.songs.length + " song" : playlist.songs.length + " songs";
        return (
        <div className="choose-playlist" onClick={(e) => this.addSong(e, playlist._id)}>
          <img className="album-photo" src='/static/images/playlist.png' alt="#" />
          <p className="modal-title-choose">{playlist.title}</p>
          <p className="modal-count">{count}</p>
          </div>)
      })
    }
    return (
      <div className="create-playlist-modal">
        <button className="btn-transparent" onClick={this.handleClick}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Close</title>
            <path
              d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143"
              fill="#fff"
              fill0rule="evenodd"
            ></path>
          </svg>
        </button>
        <h1 className="transparant-header">Add to Playlist</h1>
        <div id="choose-playlist-input-container">
          <div className="choose-playlist-name">
              {liPlaylists}
            </div>
          </div>
        <div id="form-buttons-container">
          <div id="cancel-button-container">
            <button className="cancel-button" onClick={this.handleClick}>
              Cancel
            </button>
          </div>
          <div id="create-button-container">
           
          </div>
        </div>
      </div>
    );
  }
}

export default ChoosePlaylist;
