import React from "react";

class CreatePlaylist extends React.Component {
  render() {
    return (
      <div className="create-playlist-modal">
        <button className="btn-transparent">
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
        <h1 className="transparant-header">Create New Playlist</h1>
        <div id="create-playlist-input-container">
          <div id="create-playlist-input-box">
            <div id="playlist-name-spacing">
              <input
                className="playlist-name-input-field"
                type="text"
                name="playlist-name"
                placeholder="New Playlist"
              ></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePlaylist;
