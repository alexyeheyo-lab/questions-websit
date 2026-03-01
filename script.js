/* COPY SINGLE QUESTION */
function copyText(id) {
  const text = document.getElementById(id)?.innerText;
  if (text) {
    navigator.clipboard.writeText(text);
    alert("Question copied!");
  }
}

/* COPY ALL QUESTIONS */
function copyAll() {
  const questions = document.querySelectorAll(".question-box p");
  let allText = "";

  questions.forEach((q) => {
    allText += q.innerText + "\n\n";
  });

  if (allText.trim() !== "") {
    navigator.clipboard.writeText(allText);
    alert("All questions copied!");
  }
}

/* SEARCH QUESTIONS */
function searchQuestions() {
  const input = document.getElementById("search").value.toLowerCase();
  const boxes = document.querySelectorAll(".question-box");

  boxes.forEach((box) => {
    const text = box.innerText.toLowerCase();
    box.style.display = text.includes(input) ? "block" : "none";
  });
}

/* ADMIN MODE (visual only for now) */
function adminMode() {
  const pass = prompt("Admin password:");

  if (pass === "ADMIN123") {
    document.querySelectorAll(".question-box").forEach(box => {
      box.classList.toggle("admin");
    });
    alert("Admin mode activated");
  } else {
    alert("Access denied");
  }
}

function unlockPaid() {
  const code = prompt("Enter access code:");
  let unlocked = false;

  document.querySelectorAll(".paid").forEach(section => {
    if (section.dataset.code === code) {
      section.classList.remove("locked");
      unlocked = true;
    }
  });

  if (unlocked) {
    alert("Access unlocked!");
  } else {
    alert("Invalid code. Please pay to get access.");
  }
}