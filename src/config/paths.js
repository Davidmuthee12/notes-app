const path = require("path");

const DATA_DIR = path.join(__dirname, "../../data");

module.exports = {
  NOTES_FILE: path.join(DATA_DIR, "notes.json"),
  USERS_FILE: path.join(DATA_DIR, "users.json"),
};
