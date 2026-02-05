import { getNotes } from "./api.js";
import { renderNotes, showLoading, showError, onDelete } from "./ui.js";

let notes = [];

document.addEventListener("DOMContentLoaded", () => {
  async function loadNotes() {
    try {
      showLoading();
      notes = await getNotes();
      console.log("Notes fetched:", notes);
      renderNotes(notes, onDelete);
    } catch (error) {
      showError(error);
    }
  }

  loadNotes();
});
