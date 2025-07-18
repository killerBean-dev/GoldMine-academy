// Connect to Supabase
const SUPABASE_URL = "https://bdssaibilpvnsfgxkhcp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkc3NhaWJpbHB2bnNmZ3hraGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDE2MjUsImV4cCI6MjA2ODE3NzYyNX0.gSqCOXlkhU1vMXMzkBfJ6Bw4SBrDo489jbzY1UpRXhs";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get Telegram user
const tg = window.Telegram.WebApp;
const user = tg?.initDataUnsafe?.user;

document.getElementById("username").textContent = user?.first_name || "Student";

// Claim 1 coin
const claimBtn = document.getElementById("claimCoinBtn");
const coinCount = document.getElementById("coinCount");

let coins = 0;

claimBtn.onclick = () => {
  coins += 1;
  coinCount.textContent = coins;
  tg.showNotification?.(`+1 coin claimed!`);
};

// Fetch videos (demo only)
async function fetchVideos() {
  const { data, error } = await supabase.from("videos").select("*");
  if (error || !data.length) {
    document.getElementById("videoList").textContent = "No videos yet.";
    return;
  }

  const list = data.map(v => `<p><a href="${v.link}" target="_blank">${v.title}</a></p>`).join("");
  document.getElementById("videoList").innerHTML = list;
}

fetchVideos();

// Quiz section
const quizForm = document.getElementById("quizForm");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const resultBox = document.getElementById("result");

// Sample Quiz Data (will be dynamic later)
const sampleQuiz = {
  question: "What does API stand for?",
  options: ["Application Program Interface", "Advanced Protocol Interface", "Automatic Page Index"],
  answer: 0
};

quizQuestion.textContent = sampleQuiz.question;

sampleQuiz.options.forEach((option, index) => {
  quizOptions.innerHTML += `
    <label>
      <input type="radio" name="answer" value="${index}"> ${option}
    </label><br/>
  `;
});

quizForm.onsubmit = (e) => {
  e.preventDefault();
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;

  const value = parseInt(selected.value);
  if (value === sampleQuiz.answer) {
    resultBox.textContent = "✅ Correct!";
    coins += 2;
    coinCount.textContent = coins;
    tg.showNotification?.(`+2 quiz coins!`);
  } else {
    resultBox.textContent = "❌ Wrong answer.";
  }
};
