import { RECEIVE_ARTIST, RECEIVE_ARTISTS } from '../actions/artist_actions';

const artistsReducer = (oldState = {}, action) => { 
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_ARTIST:
      return action.artist.data[0];
    case RECEIVE_ARTISTS:
      return action.artists.data;
    default:
      return oldState;
  }
};

export default artistsReducer;