//Controllers never touch files directly.
// Input validation
// Calling services
// Formatting responses
const { readNotes, writeNotes } = require("../services/fileStore-service");
const { generateId } = require("../utils/idGenerator");

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await readNotes();
    res.json({ status: "success", data: notes });
  } catch (err) {
    next(err);
  }
};

exports.createNote = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }
    const { title, content } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const notes = await readNotes();
    const newNote = {
      id: generateId(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    notes.push(newNote);
    await writeNotes(notes);

    res.status(201).json({ status: "success", data: newNote });
  } catch (err) {
    next(err);
  }
};
