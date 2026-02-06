const BASE_URL = "http://127.0.0.1:3000/notes";

export async function getNotes() {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  const data = await res.json();
  return data.data;
}

export async function createNote(note) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!res.ok) {
    throw new Error("Failed to create note");
  }

  const data = await res.json();
  return data.data;
}

export async function deleteNote(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete Selected Note");
  }
}
