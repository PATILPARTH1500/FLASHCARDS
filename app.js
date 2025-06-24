// Navbar toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Dummy flashcards for UI testing
const dummyCards = [
  {
    question: "What is Newton’s 2nd Law?",
    answer: "F = ma",
    subject: "Physics"
  },
  {
    question: "What is the atomic number of Oxygen?",
    answer: "8",
    subject: "Chemistry"
  },
  {
    question: "What is DNA?",
    answer: "Deoxyribonucleic Acid",
    subject: "Biology"
  },
  {
    question: "What is DNA?",
    answer: "Deoxyribonucleic Acid",
    subject: "Biology"
  },
  {
    question: "What is DNA?",
    answer: "Deoxyribonucleic Acid",
    subject: "Biology"
  },
  {
    question: "What is DNA?",
    answer: "Deoxyribonucleic Acid",
    subject: "Biology"
  },
  {
    question: "What is DNA?",
    answer: "Deoxyribonucleic Acid",
    subject: "Biology"
  }
];

function renderFlashcards(cards) {
  const container = document.getElementById("flashcardGrid");
  container.innerHTML = "";

  cards.forEach(card => {
    const div = document.createElement("div");
    div.classList.add("flashcard");
    div.innerHTML = `
      <p><strong>Sub:</strong> ${card.subject}</p>
      <p><strong>Que:</strong> ${card.question}</p>
      <p><strong>Ans:</strong> ${card.answer}</p>
    `;
    container.appendChild(div);
  });

  updateProfileStats(cards);
}
// Update profile text with count
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

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  renderFlashcards(dummyCards); // Replace with Firestore later
});
