import {
  RECEIVE_PLAYLIST,
  RECEIVE_USER_PLAYLISTS,
  SHOW_PLAYLIST,
  DELETE_PLAYLIST,
  RENAME_PLAYLIST
} from "../actions/playlist_actions";

const playlistReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_PLAYLIST:
      return Object.assign({}, oldState, {
        [action.playlist.data.playlist._id]: action.playlist.data.playlist
      });
    case RECEIVE_USER_PLAYLISTS:
      return action.playlists.data;
    case SHOW_PLAYLIST:
      return Object.assign({}, oldState, { current: action.playlist.data[0] })
    case RENAME_PLAYLIST:
      const nextState = Object.assign({}, oldState)
      nextState[action.playlist.data._id] = action.playlist.data
      return nextState
    case DELETE_PLAYLIST:
      const newState = Object.assign({}, oldState)
      delete newState[action.playlist._id]
      return newState
    default:
      return oldState;
  }
};

export default playlistReducer;
