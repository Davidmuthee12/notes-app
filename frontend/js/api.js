const BASE_URL = "http://127.0.0.1:3000/notes";

export async function getNotes() {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  const data = await res.json();
  return data.data;
}
