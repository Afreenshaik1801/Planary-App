/* ---------- Persistent storage keys ---------- */
const LS_KEY = "habits";              // keep same key you used before
const LS_THEME_INDEX = "habits_themeIndex";

/* ---------- Theme palette for NEW habits ---------- */
const NEW_THEMES = [
  "theme-sunrise","theme-forest","theme-lavender","theme-coral",
  "theme-mint","theme-grape","theme-sunset","theme-ocean","theme-rose","theme-night"
];

/* ---------- Default starter habits (seeded only if storage empty) ---------- */
const DEFAULTS = [
  { id: "seed-water",    name: "💧 Drink Water", desc: "Goal: 8 Glasses",  days: Array(7).fill(false), theme: "theme-water" },
  { id: "seed-meditate", name: "🧘 Meditation",  desc: "10 Minutes",       days: Array(7).fill(false), theme: "theme-meditate" },
  { id: "seed-exercise", name: "🏃 Exercise",    desc: "30 Mins",          days: Array(7).fill(false), theme: "theme-exercise" },
  { id: "seed-reading",  name: "📖 Read Book",   desc: "10 Pages",         days: Array(7).fill(false), theme: "theme-reading" },
];

document.addEventListener("DOMContentLoaded", () => {
  loadHabits();   // render everything from localStorage (or seed)
});

/* ---------- State ---------- */
let habits = [];
let editingCard = null;

/* ---------- Utility: save & load ---------- */
function saveHabits() {
  localStorage.setItem(LS_KEY, JSON.stringify(habits));
}
function getThemeIndex() {
  return parseInt(localStorage.getItem(LS_THEME_INDEX) || "0", 10);
}
function setThemeIndex(i) {
  localStorage.setItem(LS_THEME_INDEX, String(i));
}

/* ---------- Render helpers ---------- */
function updateProgress(card, habit) {
  const doneDays = habit.days.filter(Boolean).length;
  const progress = Math.round((doneDays / habit.days.length) * 100);
  card.querySelector(".progress-value").textContent = progress + "%";
  card.querySelector(".progress-fill").style.width = progress + "%";
}

function renderHabit(habit, isNew = false) {
  const habitGrid = document.getElementById("habitGrid");
  const card = document.createElement("div");
  card.className = `habit-card ${habit.theme || "theme-sunrise"} ${isNew ? "glow-new" : ""}`;
  card.dataset.id = habit.id;

  card.innerHTML = `
    <div class="habit-header">
      <div class="habit-info">
        <h2>${escapeHtml(habit.name)}</h2>
        <p>${escapeHtml(habit.desc)}</p>
      </div>
      <div class="habit-progress">
        <span class="progress-value">0%</span>
        <div class="progress-bar"><div class="progress-fill"></div></div>
      </div>
    </div>
    <div class="habit-grid">
      ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day, i) => `
        <div class="habit-day">
          <span class="day-label">${day}</span>
          <button class="day-toggle ${habit.days[i] ? "done" : ""}" onclick="toggleDay(this)">
            ${habit.days[i] ? "✔" : "○"}
          </button>
        </div>
      `).join("")}
    </div>
    <div class="habit-actions">
      <button class="edit-btn" onclick="editHabit(this)">Edit ✏️</button>
      <button class="delete-btn" onclick="deleteHabit(this)">Delete 🗑️</button>
    </div>
  `;

  habitGrid.appendChild(card);
  updateProgress(card, habit);

  if (isNew) {
    setTimeout(() => card.classList.remove("glow-new"), 1200);
  }
}

/* ---------- Main load (with seeding & migration) ---------- */
function loadHabits() {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) {
    // Load existing and ensure each has a theme
    habits = JSON.parse(raw) || [];
    let themeIdx = getThemeIndex();
    let changed = false;
    habits.forEach(h => {
      if (!h.theme) {
        h.theme = NEW_THEMES[themeIdx % NEW_THEMES.length];
        themeIdx++;
        changed = true;
      }
      if (!Array.isArray(h.days) || h.days.length !== 7) {
        h.days = Array(7).fill(false);
        changed = true;
      }
    });
    if (changed) {
      saveHabits();
      setThemeIndex(themeIdx);
    }
  } else {
    // Nothing saved yet → seed defaults
    habits = [...DEFAULTS];
    saveHabits();
    // Start the theme cycle fresh
    setThemeIndex(0);
  }

  // Render all from state
  document.getElementById("habitGrid").innerHTML = "";
  habits.forEach(h => renderHabit(h));
}

/* ---------- Toggle day ---------- */
function toggleDay(btn) {
  btn.classList.toggle("done");
  btn.textContent = btn.classList.contains("done") ? "✔" : "○";

  const card = btn.closest(".habit-card");
  const habitId = card.dataset.id;
  const dayIndex = Array.from(card.querySelectorAll(".day-toggle")).indexOf(btn);

  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;

  habit.days[dayIndex] = btn.classList.contains("done");
  updateProgress(card, habit);
  saveHabits(); // persist immediately
}

/* ---------- Modal ---------- */
function openHabitModal(edit = false) {
  document.getElementById("habitModal").style.display = "block";
  document.getElementById("modalTitle").textContent = edit ? "Edit Habit" : "Add Habit";

  if (!edit) {
    document.getElementById("habitForm").reset();
    document.getElementById("habitId").value = "";
    editingCard = null;
  }
}
function closeHabitModal() {
  document.getElementById("habitModal").style.display = "none";
}

/* ---------- Save habit (add or edit) ---------- */
function saveHabit(event) {
  event.preventDefault();
  const idField = document.getElementById("habitId").value;
  const name = document.getElementById("habitName").value.trim();
  const desc = document.getElementById("habitDesc").value.trim();

  if (!name || !desc) return;

  if (idField) {
    // update existing
    const habit = habits.find(h => h.id === idField);
    if (!habit) return;
    habit.name = name;
    habit.desc = desc;

    // update DOM
    const card = document.querySelector(`.habit-card[data-id="${idField}"]`);
    if (card) {
      card.querySelector("h2").textContent = habit.name;
      card.querySelector(".habit-info p").textContent = habit.desc;
      updateProgress(card, habit);
    }
  } else {
    // create new
    const themeIdx = getThemeIndex();
    const theme = NEW_THEMES[themeIdx % NEW_THEMES.length];
    setThemeIndex(themeIdx + 1);

    const newHabit = {
      id: Date.now().toString(),
      name,
      desc,
      days: Array(7).fill(false),
      theme
    };
    habits.push(newHabit);
    renderHabit(newHabit, true);
  }

  saveHabits();
  closeHabitModal();
}

/* ---------- Edit ---------- */
function editHabit(btn) {
  const card = btn.closest(".habit-card");
  editingCard = card;

  const id = card.dataset.id;
  const habit = habits.find(h => h.id === id);
  if (!habit) return;

  document.getElementById("habitId").value = habit.id;
  document.getElementById("habitName").value = habit.name;
  document.getElementById("habitDesc").value = habit.desc;

  openHabitModal(true);
}

/* ---------- Delete ---------- */
function deleteHabit(btn) {
  const card = btn.closest(".habit-card");
  const id = card.dataset.id;

  if (confirm("Are you sure you want to delete this habit?")) {
    card.remove();
    habits = habits.filter(h => h.id !== id);
    saveHabits();
  }
}

/* ---------- Small helper ---------- */
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, s => (
    { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' }[s]
  ));
}

