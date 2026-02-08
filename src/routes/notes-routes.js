const express = require("express");
const router = express.Router();
const controller = require("../controllers/notes-controller");

router.get("/", controller.getAllNotes);
router.post("/", controller.createNote);
router.delete("/:id", controller.deleteNote);
router.put("/:id", controller.updateNote);

module.exports = router;
