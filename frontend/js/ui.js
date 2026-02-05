// ui.js

let notesContainer;
let message;

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  notesContainer = document.getElementById("notes");
  message = document.getElementById("message");
});

export function showLoading() {
  if (message) message.textContent = "Loading your notes...";
}

export function showError(error) {
  if (message) message.textContent = "Error fetching your notes";
  console.error(error);
}

export function onDelete(id) {
  console.log("Deleted task ID", id);
}

export function renderNotes(notes, onDelete) {
  if (!notesContainer) return; // Safety check

  notesContainer.innerHTML = "";

  if (!notes || notes.length === 0) {
    notesContainer.innerHTML = "<p>No notes yet</p>";
    return;
  }

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content || ""}</p>
      <small>${note.createdAt ? new Date(note.createdAt).toLocaleString() : ""}</small>
      <br/>
      <button data-id="${note.id}">Delete</button>
    `;

    // Attach delete handler
    const btn = card.querySelector("button");
    if (btn && onDelete) {
      btn.addEventListener("click", () => onDelete(note.id));
    }

    notesContainer.appendChild(card);
  });
}
