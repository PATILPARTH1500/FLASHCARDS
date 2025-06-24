// Navbar toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


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


const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const subjectInput = document.getElementById("subjectInput");
const addCardBtn = document.getElementById("addCardBtn");

let cards = []; // Stores flashcards in-memory (for now)

// Add Flashcard
addCardBtn.addEventListener("click", () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();
  const subject = subjectInput.value;

  if (!question || !answer || !subject) {
    alert("Please fill in all fields.");
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

  // Clear form
  questionInput.value = "";
  answerInput.value = "";
  subjectInput.value = "";
});
