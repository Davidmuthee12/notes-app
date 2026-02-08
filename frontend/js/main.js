import { getNotes } from "./api.js";
import {
  renderNotes,
  showLoading,
  showError,
  openCreateDialog,
  setupCreateHandler,
} from "./ui.js";

let notes = [];

// Load all notes from backend
async function loadNotes() {
  try {
    showLoading();

    notes = await getNotes();
    const message = document.getElementById("message");
    if (message) message.textContent = "";

    // Pass reload function so UI can refresh after delete
    renderNotes(notes, loadNotes);
  } catch (error) {
    showError(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadNotes();

  // Open Create Note dialog
  const newBtn = document.getElementById("newNoteBtn");
  if (newBtn) {
    newBtn.addEventListener("click", openCreateDialog);
  }

  setupCreateHandler(loadNotes);
});
