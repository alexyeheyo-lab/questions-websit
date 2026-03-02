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

  if (pass !== "ADMIN_2026") {
    alert("Access denied");
    return;
  }

  const pendingDiv = document.getElementById("pending");
  pendingDiv.innerHTML = "<h3>Pending Questions</h3>";

  const submissions = JSON.parse(localStorage.getItem("submissions")) || [];

  submissions.forEach((item, index) => {
    if (!item.approved) {
      const div = document.createElement("div");
      div.className = "question-box";

      div.innerHTML = `
        <strong>${item.subject}</strong><br>
        ${item.question}<br>
        <em>By ${item.teacher}</em><br><br>
        <button onclick="approveQuestion(${index})">Approve</button>
      `;

      pendingDiv.appendChild(div);
    }
  });

  alert("Admin mode active");
}


// Handle teacher submissions
document.getElementById("teacherForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const submission = {
    teacher: teacherName.value,
    subject: subject.value,
    question: questionText.value,
    approved: false
  };

  const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
  submissions.push(submission);
  localStorage.setItem("submissions", JSON.stringify(submissions));

  alert("Question submitted for approval.");
  this.reset();
});




function approveQuestion(index) {
  const submissions = JSON.parse(localStorage.getItem("submissions"));
  submissions[index].approved = true;
  localStorage.setItem("submissions", JSON.stringify(submissions));

  alert("Question approved. Refresh page.");
}