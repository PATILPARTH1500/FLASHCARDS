let cards = [];
let editCardId = null;

// Navbar toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Form elements
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const subjectInput = document.getElementById("subjectInput");
const addCardBtn = document.getElementById("addCardBtn");

// Edit modal elements
const editModal = document.getElementById("editModal");
const editQuestion = document.getElementById("editQuestion");
const editAnswer = document.getElementById("editAnswer");
const editSubject = document.getElementById("editSubject");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

// Delete modal & toast
const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const toast = document.getElementById("toast");

let pendingDeleteId = null;

// Add Flashcard
addCardBtn.addEventListener("click", () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();
  const subject = subjectInput.value;

  if (!question || !answer || !subject) {
    showToast("❌ Fill all fields.");
    return;
  }

  const newCard = {
    question,
    answer,
    subject,
    id: Date.now()
  };

  cards.push(newCard);
  localStorage.setItem("flashcards", JSON.stringify(cards));
  renderFlashcards(cards);
  showToast("✅ Flashcard added.");

  // Reset form
  questionInput.value = "";
  answerInput.value = "";
  subjectInput.value = "";
});

// Render flashcards
function renderFlashcards(cards) {
  const container = document.getElementById("flashcardGrid");
  container.innerHTML = "";

  cards.forEach(card => {
    const div = document.createElement("div");
    div.classList.add("flashcard");
    div.innerHTML = `
      <p><strong>Subject:</strong> ${card.subject}</p>
      <p><strong>Q:</strong> ${card.question}</p>
      <p><strong>A:</strong> ${card.answer}</p>
      <div class="flashcard-actions">
        <button class="edit-btn" data-id="${card.id}">✏️ Edit</button>
        <button class="delete-btn" data-id="${card.id}">🗑️ Delete</button>
      </div>
    `;
    container.appendChild(div);
  });

  updateProfileStats(cards);
  bindCardButtons();
}

// Bind buttons
function bindCardButtons() {
  // Delete
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      pendingDeleteId = e.target.dataset.id;
      deleteModal.classList.remove("hidden");
    });
  });

  // Edit (open modal)
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const card = cards.find(c => c.id == id);
      if (!card) return;

      editCardId = card.id;
      editQuestion.value = card.question;
      editAnswer.value = card.answer;
      editSubject.value = card.subject;
      editModal.classList.remove("hidden");
    });
  });
}

// Edit modal - Save
saveEditBtn.addEventListener("click", () => {
  const updatedQuestion = editQuestion.value.trim();
  const updatedAnswer = editAnswer.value.trim();
  const updatedSubject = editSubject.value;

  if (!updatedQuestion || !updatedAnswer || !updatedSubject) {
    showToast("❌ Fill all fields.");
    return;
  }

  const index = cards.findIndex(c => c.id === editCardId);
  if (index !== -1) {
    cards[index] = {
      id: editCardId,
      question: updatedQuestion,
      answer: updatedAnswer,
      subject: updatedSubject
    };

    localStorage.setItem("flashcards", JSON.stringify(cards));
    renderFlashcards(cards);
    showToast("✅ Flashcard updated.");
  }

  editModal.classList.add("hidden");
  editCardId = null;
});

// Edit modal - Cancel
cancelEditBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
  editCardId = null;
});

// Delete modal - Confirm
confirmDeleteBtn.addEventListener("click", () => {
  cards = cards.filter(card => card.id != pendingDeleteId);
  localStorage.setItem("flashcards", JSON.stringify(cards));
  renderFlashcards(cards);
  deleteModal.classList.add("hidden");
  showToast("🗑️ Flashcard deleted.");
});

// Delete modal - Cancel
cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
});

// Toast message
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Update profile stats
function updateProfileStats(cards) {
  document.querySelector(".profile-info p strong").textContent = cards.length;

  const counts = cards.reduce((acc, card) => {
    acc[card.subject] = (acc[card.subject] || 0) + 1;
    return acc;
  }, {});

  const summary = Object.entries(counts)
    .map(([sub, count]) => `${sub} (${count})`)
    .join(", ");

  document.querySelectorAll(".profile-info p")[1].textContent = `Subjects: ${summary}`;
}

// Load from localStorage
document.addEventListener("DOMContentLoaded", () => {
  cards = JSON.parse(localStorage.getItem("flashcards")) || [];
  renderFlashcards(cards);
});
