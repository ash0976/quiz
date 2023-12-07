const username = document.getElementById("username")
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  e.preventDefault();

  const score = {
    score: finalScore.innerText,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  confetti({
    particleCount: 100,
    spread: 150,
    origin: { y: 1 },
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
  });

  localStorage.setItem("highScores", JSON.stringify(highScores));
};