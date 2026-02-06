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
    console.log("Notes fetched:", notes);

    // Pass reload function so UI can refresh after delete
    renderNotes(notes, loadNotes);
  } catch (error) {
    showError(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial load
  loadNotes();

  // Open Create Note dialog
  const newBtn = document.getElementById("newNoteBtn");
  if (newBtn) {
    newBtn.addEventListener("click", openCreateDialog);
  }

  // Handle create form submit
  setupCreateHandler(loadNotes);
});
