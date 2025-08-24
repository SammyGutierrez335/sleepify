import React from 'react';
import SongIndexItem from '../index/song_index_item';

class ArtistShow extends React.Component {
  componentDidMount() {
    this.props.fetchArtist(this.props.match.params.id);
  }

  render() {
    console.log(this.props.artist)
    let liSongs;
    if (!this.props.artist) return null;
    let artist = this.props.artist;
    let songs = artist.songs;
    if (songs) {
      liSongs = songs.map(song => <SongIndexItem key={song._id} song={song} addTrack={this.props.addTrack} playTrack={this.props.playTrack} addSongToPlaylist={this.props.addSongToPlaylist} openModal={this.props.openModal} closeModal={this.props.closeModal}/>); 
    }
    return (
      <div className="artist-page">
        <img className="artist-show-photo" src={artist.imageUrl} alt=""/>
        <div className="open-player-body"> 
          <h1 className="artist-show-title">{artist.name}</h1>
          <div className="artist-show-songs">
            {liSongs}
          </div>
        </div>  
      </div>
    )
  };
};

export default ArtistShow; 