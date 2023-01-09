const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validatePlaylistInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : "";

  if (!Validator.isLength(data.title, { min: 1, max: 50 })) {
    errors.title = "Playlist Title must be between 1 and 50 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Playlist title field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
