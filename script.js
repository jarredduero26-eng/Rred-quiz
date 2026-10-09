
const $ = (id) => document.getElementById(id);

const pages = [
  "loginPage", "gamePage", "friendPage",
  "exitPage", "universePage", "finalPage"
];

function showPage(id) {
  pages.forEach(page => $(page).classList.toggle("hidden", page !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Cinematic star field
function createStars(container, count, className = "") {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("i");
    star.className = className;
    star.style.cssText = `
      position:absolute;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      width:${Math.random() > .8 ? 3 : 1.5}px;
      height:${Math.random() > .8 ? 3 : 1.5}px;
      background:#e3ffe9;
      border-radius:50%;
      opacity:${Math.random() * .7 + .15};
      box-shadow:0 0 ${Math.random() * 8 + 2}px #a5ffc2;
      animation:starTwinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
    `;
    container.appendChild(star);
  }
}
createStars($("stars"), 110);
createStars($("universeStars"), 130);

// Make the agent's pupils follow the mouse.
document.addEventListener("mousemove", event => {
  document.querySelectorAll(".eye").forEach(eye => {
    const pupil = eye.querySelector("b");
    const rect = eye.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const angle = Math.atan2(dy, dx);
    pupil.style.transform =
      `translate(${Math.cos(angle) * 3}px, ${Math.sin(angle) * 3}px)`;
  });
});

// 30 questions. Answer choices are shuffled each time.
const questions = [
  { q: "Which number is the key to this agent's identity?", a: ["26", "08", "17", "05"], c: "26" },
  { q: "Which basketball position belongs in the personnel file?", a: ["Small Forward", "Point Guard", "Center", "Power Forward"], c: "Small Forward" },
  { q: "After a long mission, which food is the agent's favorite?", a: ["Fried chicken", "Pizza", "Pancit", "Spaghetti"], c: "Fried chicken" },
  { q: "Which snack and color combination is correct?", a: ["Pillows — violet", "Pillows — red", "Cookies — violet", "Chips — blue"], c: "Pillows — violet" },
  { q: "Which year appears in the agent's life file?", a: ["2008", "2006", "2007", "2009"], c: "2008" },
  { q: "Which municipality is the agent's birthplace?", a: ["Talakag", "Claveria", "Balingasag", "Opol"], c: "Talakag" },
  { q: "Region X is another name for which region?", a: ["Northern Mindanao", "Davao Region", "Caraga", "Central Visayas"], c: "Northern Mindanao" },
  { q: "Which province is connected to the agent's birthplace?", a: ["Bukidnon", "Misamis Oriental", "Surigao del Sur", "Lanao del Norte"], c: "Bukidnon" },
  { q: "Which sport would most likely lead you to the agent's favorite place?", a: ["Basketball", "Volleyball", "Badminton", "Football"], c: "Basketball" },
  { q: "An opponent misses a shot. What basketball role matches a player who loves collecting that rebound?", a: ["Rebound chaser", "Three-point specialist", "Point guard only", "Referee"], c: "Rebound chaser" },
  { q: "Which course is written in the agent's file?", a: ["BSIT", "BSCS", "BSHM", "BSED"], c: "BSIT" },
  { q: "Choose the correct college and city combination.", a: ["USTP, CDO", "A college in Claveria", "A university in Cebu", "A university in Manila"], c: "USTP, CDO" },
  { q: "Which height matches the personnel file?", a: ["5'7\"", "5'5\"", "5'6\"", "5'9\""], c: "5'7\"" },
  { q: "Which flower is the agent's favorite?", a: ["Rose", "Tulip", "Sunflower", "Orchid"], c: "Rose" },
  { q: "Where would you most likely find the agent spending time?", a: ["Basketball court", "Library", "Cafeteria", "Computer lab"], c: "Basketball court" },
  { q: "What profession is the agent's dream?", a: ["Police officer", "Pilot", "Architect", "Chef"], c: "Police officer" },
  { q: "Who is the agent's favorite person in the family?", a: ["His mother", "His cousin", "His uncle", "His grandfather"], c: "His mother" },
  { q: "Which name belongs to the agent's brother who died before birth?", a: ["Marven D. Duero", "Martin D. Duero", "Marvin D. Dureo", "Marlon D. Duero"], c: "Marven D. Duero" },
  { q: "Which anime character is the agent's favorite?", a: ["Saitama", "Naruto", "Luffy", "Goku"], c: "Saitama" },
  { q: "Which color wins the agent's favorite-color choice?", a: ["Red", "Blue", "Black", "Green"], c: "Red" },
  { q: "Which game belongs to the agent's past gaming interests?", a: ["Pokemon", "Roblox", "Free Fire", "Clash of Clans"], c: "Pokemon" },
  { q: "Which game is part of the agent's present gaming interests?", a: ["Mobile Legends", "Minecraft", "Pokemon", "Call of Duty"], c: "Mobile Legends" },
  { q: "Decode the agent's online order: first, second, then third.", a: ["Facebook → TikTok → Instagram", "TikTok → Instagram → Facebook", "Instagram → Facebook → TikTok", "Facebook → Instagram → TikTok"], c: "Facebook → TikTok → Instagram" },
  { q: "Which workout belongs in the agent's routine?", a: ["Push-ups", "Sit-ups only", "Cycling only", "Jump rope only"], c: "Push-ups" },
  { q: "Which drink belongs in the agent's favorites?", a: ["Pocari", "Cola", "Coffee", "Milk tea"], c: "Pocari" },
  { q: "The file gives the number 26. Which choice repeats it exactly?", a: ["26", "62", "206", "2006"], c: "26" },
  { q: "Which pairing matches both the agent's course and college?", a: ["BSIT — USTP, CDO", "BSCS — Claveria", "BSHM — Cebu", "BSED — Manila"], c: "BSIT — USTP, CDO" },
  { q: "Which two details belong together in the agent's profile?", a: ["Rose and red", "Tulip and blue", "Orchid and black", "Sunflower and violet"], c: "Rose and red" },
  { q: "Which pair correctly matches the agent's old and current games?", a: ["Pokemon → Mobile Legends", "Mobile Legends → Pokemon", "Roblox → Free Fire", "Free Fire → Minecraft"], c: "Pokemon → Mobile Legends" },
  { q: "Which complete profile combination matches the agent?", a: ["BSIT, basketball, police officer", "BSCS, volleyball, pilot", "BSHM, football, chef", "BSED, badminton, architect"], c: "BSIT, basketball, police officer" }
];

let questionIndex = 0;
let hearts = 3;
let score = 0;
let answered = false;
let gameOver = false;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Demo login only: checks input format, not Facebook identity.
$("loginForm").addEventListener("submit", event => {
  event.preventDefault();
  const email = $("email").value.trim();
  const password = $("password").value;
  const error = $("loginError");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = "⚠ Invalid email format. Check your email and try again.";
    return;
  }
  if (password.length < 4) {
    error.textContent = "⚠ Demo password must contain at least 4 characters.";
    return;
  }

  error.textContent = "";
  startGame();
});

function startGame() {
  questionIndex = 0;
  hearts = 3;
  score = 0;
  answered = false;
  gameOver = false;

  $("gameAgent").style.left = "18%";
  $("gameAgent").style.filter = "";
  $("gameAgent").classList.remove("walking");
  $("startDoor").classList.remove("unlocked");
  $("nextDoor").classList.remove("unlocked");

  showPage("gamePage");
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const item = questions[questionIndex];

  $("questionCount").textContent =
    `${String(questionIndex + 1).padStart(2, "0")} / 30`;
  $("questionNumber").textContent =
    `QUESTION ${String(questionIndex + 1).padStart(2, "0")}`;
  $("questionText").textContent = item.q;
  $("progressBar").style.width = `${(questionIndex / 30) * 100}%`;
  $("hearts").textContent = hearts > 0 ? Array(hearts).fill("♥").join(" ") : "—";
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("nextBtn").classList.add("hidden");
  $("nextBtn").textContent = questionIndex === 29 ? "COMPLETE MISSION →" : "OPEN NEXT DOOR →";
  $("answers").innerHTML = "";
  $("worldCaption").textContent = "AGENT RRED: AWAITING YOUR ANSWER";
  $("gameAgent").classList.remove("walking");
  $("gameAgent").style.filter = "";

  $("startDoor").classList.add("unlocked");
  $("nextDoor").classList.remove("unlocked");
  $("nextDoor").querySelector("small").textContent = "LOCKED";
  $("nextDoor").querySelector("span").textContent = "🔒";

  shuffle(item.a).forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(choice, button));
    $("answers").appendChild(button);
  });
}

function checkAnswer(choice, button) {
  if (answered || gameOver) return;
  answered = true;

  const item = questions[questionIndex];
  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === item.c) btn.classList.add("correct");
  });

  if (choice === item.c) {
    score++;
    $("feedback").textContent = "✓ CORRECT! Agent RRED advances. Door unlocked!";
    $("worldCaption").textContent = "ACCESS GRANTED // DOOR UNLOCKED";
    $("nextDoor").classList.add("unlocked");
    $("nextDoor").querySelector("small").textContent = "UNLOCKED";
    $("nextDoor").querySelector("span").textContent = "✓";

    $("gameAgent").classList.add("walking");
    $("gameAgent").style.left = "68%";
    $("nextBtn").classList.remove("hidden");
  } else {
    button.classList.add("wrong");
    hearts--;
    $("hearts").textContent = hearts > 0 ? Array(hearts).fill("♥").join(" ") : "—";
    $("feedback").className = "feedback bad";
    $("feedback").textContent = hearts > 0
      ? "✕ The enemy attacks! One heart lost. Returning to the starting point..."
      : "✕ GAME OVER. The agent has lost all three hearts.";

    $("worldCaption").textContent = "WARNING // ENEMY ATTACK";
    $("attackFlash").classList.remove("active");
    void $("attackFlash").offsetWidth;
    $("attackFlash").classList.add("active");

    $("gameAgent").classList.add("walking");
    $("gameAgent").style.filter = "brightness(1.7) sepia(1)";

    setTimeout(() => {
      $("gameAgent").style.left = "18%";
      $("gameAgent").style.filter = "";
      $("gameAgent").classList.remove("walking");
      $("startDoor").classList.add("unlocked");
      $("nextDoor").classList.remove("unlocked");
    }, 500);

    if (hearts <= 0) {
      gameOver = true;
      setTimeout(() => finishGame(false), 1300);
    } else {
      // A wrong answer restarts the quiz at Question 1.
      setTimeout(() => {
        questionIndex = 0;
        score = 0;
        renderQuestion();
        $("worldCaption").textContent = "BACK AT START // TRY AGAIN";
      }, 1700);
    }
  }
}

$("nextBtn").addEventListener("click", () => {
  if (gameOver || !answered) return;

  if (questionIndex === questions.length - 1) {
    finishGame(true);
    return;
  }

  questionIndex++;
  renderQuestion();
});

function finishGame(won) {
  gameOver = true;

  if (won) {
    $("congratsScore").textContent = `30 / 30 QUESTIONS COMPLETED`;
    showPage("friendPage");
  } else {
    $("endSymbol").textContent = "✕";
    $("endTitle").textContent = "GAME OVER";
    $("endMessage").textContent =
      "The agent has run out of hearts. Log in again to begin a new mission.";
    $("finalScore").textContent = `CORRECT ANSWERS: ${score} / 30`;
    showPage("exitPage");
    $("endSymbol").textContent = "💔";
  }
}

// Leaving the game returns to login.
$("quitBtn").addEventListener("click", () => {
  $("loginForm").reset();
  $("loginError").textContent = "";
  showPage("loginPage");
});

// Friendship choice.
$("yesFriend").addEventListener("click", () => {
  startUniverse();
});
$("noFriend").addEventListener("click", () => showPage("exitPage"));
$("exitFinish").addEventListener("click", () => {
  $("loginForm").reset();
  showPage("loginPage");
});

// Universe: 0 heart, 1 flower, 2 message, 3 ring.
const scenes = [
  {
    className: "scene-heart",
    caption: "A little heart, floating in an endless galaxy.",
    button: "LET THE FLOWER BLOOM →"
  },
  {
    className: "scene-flower",
    caption: "Even in a huge universe, a little kindness can bloom.",
    button: "DISCOVER A MESSAGE →"
  },
  {
    className: "scene-like",
    caption: "A simple message, shared with no pressure or expectation.",
    button: "EXPLORE THE FINAL SCENE →"
  },
  {
    className: "scene-ring",
    caption: "A cinematic symbol of a special moment — no pressure, just a little wonder.",
    button: "READ THE FINAL MESSAGE →"
  }
];

let sceneIndex = 0;
let touchStartX = 0;

function startUniverse() {
  sceneIndex = 0;
  showPage("universePage");
  renderScene();
}

function renderScene() {
  const scene = scenes[sceneIndex];
  const stage = $("universeScene");

  stage.classList.remove("scene-heart", "scene-flower", "scene-like", "scene-ring");
  stage.classList.add(scene.className);

  $("sceneCount").textContent = `SCENE ${String(sceneIndex + 1).padStart(2, "0")} / 04`;
  $("cosmicCaption").textContent = scene.caption;
  $("nextScene").textContent = scene.button;

  document.querySelectorAll(".scene-dots i").forEach((dot, i) => {
    dot.classList.toggle("active", i === sceneIndex);
  });
}

function nextUniverseScene() {
  if (sceneIndex < scenes.length - 1) {
    sceneIndex++;
    renderScene();
  } else {
    showPage("finalPage");
  }
}

$("nextScene").addEventListener("click", nextUniverseScene);

// Touch swipe support for phones/tablets.
$("universeScene").addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

$("universeScene").addEventListener("touchend", event => {
  const deltaX = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(deltaX) > 55) {
    if (deltaX < 0) {
      nextUniverseScene();
    } else if (sceneIndex > 0) {
      sceneIndex--;
      renderScene();
    }
  }
}, { passive: true });

// Mouse drag also works on desktop.
let mouseStartX = null;
$("universeScene").addEventListener("pointerdown", event => {
  if (event.pointerType === "mouse") mouseStartX = event.clientX;
});
$("universeScene").addEventListener("pointerup", event => {
  if (mouseStartX === null) return;
  const deltaX = event.clientX - mouseStartX;
  mouseStartX = null;
  if (Math.abs(deltaX) > 70) {
    if (deltaX < 0) {
      nextUniverseScene();
    } else if (sceneIndex > 0) {
      sceneIndex--;
      renderScene();
    }
  }
});

$("restartBtn").addEventListener("click", () => {
  $("loginForm").reset();
  $("loginError").textContent = "";
  showPage("loginPage");
});
