import { deleteNote, createNote } from "./api.js";
import { updateNote } from "./api.js";

let notesContainer;
let message;

let dialog, form, closeBtn;

let confirmModal, cancelDeleteBtn, confirmDeleteBtn;
let noteToDeleteId = null;
let reloadAfterDelete = null;
let editingNoteId = null;

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  notesContainer = document.getElementById("notes");
  message = document.getElementById("message");

  dialog = document.getElementById("createDialog");
  form = document.getElementById("createForm");
  closeBtn = document.getElementById("closeDialog");

  confirmModal = document.getElementById("confirmModal");
  cancelDeleteBtn = document.getElementById("cancelDelete");
  confirmDeleteBtn = document.getElementById("confirmDelete");

  cancelDeleteBtn?.addEventListener("click", closeConfirmModal);

  confirmDeleteBtn?.addEventListener("click", handleConfirmDelete);
});

export function openCreateDialog() {
  dialog?.showModal();
}

export function closeCreateDialog() {
  dialog?.close();
}

export function setupCreateHandler(refreshNotes) {
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    try {
      if (editingNoteId) {
        // EDIT MODE
        await updateNote(editingNoteId, { title, content });
        showToast("Note Editted Succesfully");
      } else {
        // CREATE MODE
        await createNote({ title, content });
        showToast("Note Created Successfully");
      }

      form.reset();
      editingNoteId = null;
      closeCreateDialog();
      refreshNotes();
    } catch (err) {
      console.error(err);
      alert("Failed to save note");
    }
  });

  closeBtn?.addEventListener("click", () => {
    editingNoteId = null;
    closeCreateDialog();
  });
}

function openConfirmModal(id, reloadFn) {
  noteToDeleteId = id;
  reloadAfterDelete = reloadFn;
  confirmModal?.classList.remove("hidden");
}

function closeConfirmModal() {
  noteToDeleteId = null;
  confirmModal?.classList.add("hidden");
}

function showToast(message, duration = 2500) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, duration);
}

function openEditDialog(note) {
  editingNoteId = note.id;

  document.getElementById("title").value = note.title;
  document.getElementById("content").value = note.content || "";

  dialog?.showModal();
}

async function handleConfirmDelete() {
  if (!noteToDeleteId) return;

  try {
    // Optimistic UI removal
    const card = document.querySelector(`[data-id="${noteToDeleteId}"]`);
    card?.remove();

    await deleteNote(noteToDeleteId);
  } catch (error) {
    console.error("Delete failed:", error);
    await reloadAfterDelete?.();
  } finally {
    closeConfirmModal();
  }
}

export function showLoading() {
  if (message) message.textContent = "Loading your notes...";
}

export function showError(error) {
  if (message) message.textContent = "Error fetching your notes";
  console.error(error);
}

export function renderNotes(notes, reloadNotes) {
  if (!notesContainer) return;

  notesContainer.innerHTML = "";

  if (!notes || notes.length === 0) {
    notesContainer.innerHTML = "<p>No notes yet</p>";
    return;
  }

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.dataset.id = note.id;

    card.innerHTML = `
      <h3>${note.title}</h3>
      <div class='note-details'>
        <div class='description'>
          <p>${note.content || ""}</p>
          <small class='time'>${
            note.createdAt ? new Date(note.createdAt).toLocaleString() : ""
          }</small>
        </div>

        <div class="options">
          <button class="edit-btn" data-id="${note.id}">
            <i class="fas fa-edit"></i>
            Edit
          </button>

          <button class="delete-btn" data-id="${note.id}">
            <i class="fas fa-trash"></i>
            Delete
          </button>
        </div>

      </div>
    `;

    // OPEN CUSTOM DELETE MODAL
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      openConfirmModal(note.id, reloadNotes);
    });

    const editBtn = card.querySelector(".edit-btn");

    editBtn.addEventListener("click", () => {
      openEditDialog(note);
    });

    notesContainer.appendChild(card);
  });
}
