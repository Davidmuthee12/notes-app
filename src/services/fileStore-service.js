// storage engine
const fs = require("fs").promises;
const { NOTES_FILE } = require("../config/paths");
const { atomicWrite } = require("../utils/atomicWrite");
const { withLock } = require("../utils/fileLock");

async function readNotes() {
  const data = await fs.readFile(NOTES_FILE, "utf8");
  return JSON.parse(data);
}

async function writeNotes(notes) {
  return withLock(() => atomicWrite(NOTES_FILE, notes));
}

module.exports = {
  readNotes,
  writeNotes,
};
