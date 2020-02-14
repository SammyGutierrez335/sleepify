import axios from "axios";

export const fetchSongs = () => {
  return axios.get("/api/songs");
};

export const fetchSong = id => {
  return axios.get(`/api/songs/${id}`);
};

export const searchSongs = search => {
  return axios.get(`/api/songs/search/${search}`);
};

export const toggleLike = (likeData) => {
  return axios.patch(`/api/songs/like/${likeData.songId}`, likeData)
};

// export const unlikeSong = (likeData) => {
//   return axios.patch(`/api/songs/like/delete/${likeData.songId}`, likeData)
// };