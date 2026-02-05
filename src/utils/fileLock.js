// concurrency protection
let isLocked = false;

module.exports.withLock = async (fn) => {
  if (isLocked) throw new Error("File is busy");

  isLocked = true;
  try {
    return await fn();
  } finally {
    isLocked = false;
  }
};
