//Controllers never touch files directly.
// Input validation
// Calling services
// Formatting responses
const { readNotes, writeNotes } = require("../services/fileStore-service");
const { generateId } = require("../utils/idGenerator");

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await readNotes();

    // Sort newest → oldest
    const sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    res.json({ status: "success", data: sortedNotes });
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

exports.updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const notes = await readNotes();

    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    const updatedNote = {
      ...notes[index],
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    notes[index] = updatedNote;

    await writeNotes(notes);

    res.json({
      status: "success",
      data: updatedNote,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    const notes = await readNotes();

    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    const deletedNote = notes.splice(noteIndex, 1)[0];

    await writeNotes(notes);

    res.json({
      status: "success",
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (err) {
    next(err);
  }
};
