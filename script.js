const noteTitle = document.querySelector("#note-title");
const noteBody = document.querySelector("#note-body");
const notePriority = document.querySelector("#note-priority");
const swatches = Array.from(document.querySelectorAll(".swatch"));
const addBtn = document.querySelector("#add-note");
const clearBtn = document.querySelector("#clear-all");
const noteGrid = document.querySelector("#note-grid");
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const noteTemplate = document.querySelector("#note-template");

// PWA install button
const shortcutInstallBtn = document.querySelector("#shortcut-install");

const STORAGE_KEY = "note-tracker:notes";

let deferredPrompt; // Variable to store the PWA event

// --- PWA LOGIC for "Install App" button ---
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  shortcutInstallBtn.style.display = "block";
});

shortcutInstallBtn.addEventListener("click", () => {
  shortcutInstallBtn.style.display = "none";

  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA install prompt");
      } else {
        console.log("User dismissed the PWA install prompt");
      }
      deferredPrompt = null;
    });
  }
});

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn("Failed to parse saved notes", error);
    return [];
  }
};

const storeNotes = (notes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

const readNotes = () => {
  const cached = localStorage.getItem(STORAGE_KEY);
  return cached ? safeParse(cached) : [];
};

const activeColor = () => {
  const activeSwatch = swatches.find((swatch) =>
    swatch.classList.contains("is-active")
  );
  return activeSwatch?.dataset.color || "#fda4af";
};

const resetForm = () => {
  noteTitle.value = "";
  noteBody.value = "";
  notePriority.value = "medium";
  swatches.forEach((swatch, index) => {
    swatch.classList.toggle("is-active", index === 0);
    swatch.setAttribute("aria-pressed", index === 0 ? "true" : "false");
  });
};

const formatDate = (value) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const createNoteCard = (note) => {
  const clone = noteTemplate.content.firstElementChild.cloneNode(true);
  clone.dataset.priority = note.priority;
  clone.dataset.id = note.id;
  clone.querySelector(".accent-bar").style.background = note.color;
  clone.querySelector("h3").textContent = note.title || "Untitled";
  clone.querySelector("p").textContent = note.body || "No extra details.";

  const badge = clone.querySelector(".badge");
  badge.textContent = note.priority;
  badge.dataset.level = note.priority;

  clone.querySelector("time").textContent = formatDate(note.createdAt);
  return clone;
};

const renderNotes = (filter = "all") => {
  const notes = readNotes();
  noteGrid.innerHTML = "";

  const filtered =
    filter === "all" ? notes : notes.filter((note) => note.priority === filter);

  if (!filtered.length) {
    const emptyState = document.createElement("p");
    emptyState.textContent = "No notes yet. Add something memorable!";
    emptyState.className = "empty-copy";
    noteGrid.appendChild(emptyState);
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach((note) => fragment.appendChild(createNoteCard(note)));
  noteGrid.appendChild(fragment);
};

const addNote = () => {
  const title = noteTitle.value.trim();
  const body = noteBody.value.trim();

  if (!title && !body) {
    noteTitle.focus();
    return;
  }

  const next = {
    id: crypto.randomUUID(),
    title,
    body,
    priority: notePriority.value,
    color: activeColor(),
    createdAt: new Date().toISOString(),
  };

  const saved = [next, ...readNotes()];
  storeNotes(saved);
  renderNotes(getActiveFilter());
  resetForm();
};

const removeNote = (id) => {
  const updated = readNotes().filter((note) => note.id !== id);
  storeNotes(updated);
  renderNotes(getActiveFilter());
};

// --- SIMPLE CLEAR ALL (no modal) ---
const clearAllNotes = () => {
  if (!readNotes().length) return;
  localStorage.removeItem(STORAGE_KEY);
  renderNotes(getActiveFilter());
};

clearBtn.addEventListener("click", clearAllNotes);

const getActiveFilter = () => {
  const active = filterButtons.find((btn) =>
    btn.classList.contains("is-active")
  );
  return active?.dataset.filter ?? "all";
};

const handleFilterClick = (event) => {
  filterButtons.forEach((btn) => btn.classList.remove("is-active"));
  event.currentTarget.classList.add("is-active");
  renderNotes(event.currentTarget.dataset.filter);
};

const handleSwatchClick = (event) => {
  swatches.forEach((swatch) => {
    swatch.classList.remove("is-active");
    swatch.setAttribute("aria-pressed", "false");
  });
  event.currentTarget.classList.add("is-active");
  event.currentTarget.setAttribute("aria-pressed", "true");
};

// Event Listeners
swatches.forEach((swatch) =>
  swatch.addEventListener("click", handleSwatchClick)
);
filterButtons.forEach((btn) =>
  btn.addEventListener("click", handleFilterClick)
);
addBtn.addEventListener("click", addNote);

// Event delegation for deleting notes
noteGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (target.dataset.action === "delete") {
    removeNote(target.closest(".note-card").dataset.id);
  }
});

// Shortcut: Meta/Ctrl + Enter to submit the note
noteBody.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    addNote();
  }
});

// Initialize the app
renderNotes();
