import React from "react";
import Player from "../player/player_container";
import SideBar from "../sidebar/sidebar";
import Search from "../index/search_container";
import ArtistShow from "../show/artist_show_container";
import PlayerQueueContainer from "../player/player_queue_container";
import OpenHeader from "./open_header";
import AlbumShow from "../show/album_show_container";
import PlaylistShow from "../show/playlist_show_container";
import Suggested from "./suggested.js";
import Library from "../index/library";
import LikedSongs from "../index/liked_container";

// import { AuthRoute, ProtectedRoute } from "../../util/route_util";
import { Switch, Route } from "react-router-dom";
import Mainview from "./mainview";
import GenreShow from "../show/genre_show_container";

class Open extends React.Component {
  componentDidMount = () => {
    if (this.props) {
      this.props.history.replace("/open");
    }
  };
  // onContextMenu={e => e.preventDefault()}
  render() {
    return (
      <div className="open-player" >
        <Mainview />
        <OpenHeader />
        <SideBar />
        <Player />
        <Switch>
          <Route exact path="/open" component={Suggested} />
          <Route path="/open/search" component={Search} />
          <Route path="/open/genre/:genre" component={GenreShow} />
          <Route path="/open/queue" component={PlayerQueueContainer} />
          <Route path="/open/artist/:id" component={ArtistShow} id={this.props.id} />
          <Route path="/open/album/:id" component={AlbumShow} id={this.props.id} />
          <Route path="/open/playlist/:id" component={PlaylistShow} id={this.props.id} />
          <Route path="/open/library" component={Library} />
          <Route path="/open/likedsongs" component={LikedSongs} />
        </Switch>
      </div>
    );
  }
}

export default Open;
