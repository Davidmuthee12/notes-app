const fs = require("fs").promises;
const path = require("path");
const os = require("os");

async function atomicWrite(filePath, data) {
  const tempFile = path.join(path.dirname(filePath), `temp-${Date.now()}.json`);

  try {
    // Write JSON data to temp file
    await fs.writeFile(tempFile, JSON.stringify(data, null, 2));

    // Try atomic rename
    await fs.rename(tempFile, filePath);
  } catch (err) {
    if (err.code === "EXDEV") {
      // Cross-device move fallback: copy then delete
      await fs.copyFile(tempFile, filePath);
      await fs.unlink(tempFile);
    } else {
      throw err; // rethrow other errors
    }
  }
}

module.exports = { atomicWrite };
