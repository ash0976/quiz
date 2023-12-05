const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let timer;

let questions = [
  {
    question: "Hva er en SQL-Injeksjon?",
    choice1: "En måte å lage kaffe på",
    choice2: "En type datavirus",
    choice3: "En metode for å manipulere databasespørringer",
    choice4: "En form for trådløs kommunikasjon",
    answer: 3,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hva betyr begrepet metadata",
    choice1: "Data om data",
    choice2: "En metode for å kryptere filer",
    choice3: "En type grafisk brukergrensesnitt",
    choice4: "En form for sosial media",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hva står forkortelsen IKT for",
    choice1: "Internasjonalt Kriminelt Tribunal",
    choice2: "Informasjons- og kommunikasjonsteknologi",
    choice3: "Institutt for Kreativ Teknologi",
    choice4: "Interaktiv Kunst og Teknologi",
    answer: 2,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hva står forkortelsen CPU for",
    choice1: "Central Processing Unit",
    choice2: "Computer Personal Unit",
    choice3: "Central Program Unit",
    choice4: "Central Peripheral Unit",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hva er dette programmeringsspråk?",
    choice1: "Java",
    choice2: "C++",
    choice3: "Python",
    choice4: "JavaScript",
    answer: 3,
    mediaType: "image",
    mediaSource: "https://upload.wikimedia.org/wikipedia/commons/a/a4/JavaScript_code.png"
  },
  {
    question: "Hva er forskjellen mellom bit og byte?",
    choice1: "Bit er en enhet for datalagring, mens byte er en enhet for databehandling",
    choice2: "Bit er en enhet for databehandling, mens byte er en enhet for datalagring",
    choice3: "Bit er en enhet for tid, mens byte er en enhet for avstand",
    choice4: "Det er ingen forskjell mellom bit og byte",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hvilket operativsystem er kjernen i Android-plattformen?",
    choice1: "iOS",
    choice2: "Linux",
    choice3: "Windows",
    choice4: "MacOS",
    answer: 2,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hvilken type programvare brukes til å beskytte en datamaskin mot skadelig programvare?",
    choice1: "Antivirusprogramvare",
    choice2: "Grafikkprogramvare",
    choice3: "Operativsystemprogramvare",
    choice4: "Kontorprogramvare",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hva er en bug?",
    choice1: "En feil i programvare eller maskinvare",
    choice2: "En type insekt",
    choice3: "En programvarefunksjon",
    choice4: "En datamaskin",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hvordan fungerer begrepet Two-Factor Authentication (2FA)",
    choice1: "To separate autentiseringsmetoder som kreves for å få tilgang",
    choice2: "To separate brukernavn og passord",
    choice3: "To separate datamaskiner",
    choice4: "To separate internettforbindelser",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hva betyr HTTP 404 NOT FOUND",
    choice1: "En feilmelding som indikerer at nettsiden ikke ble funnet",
    choice2: "En vellykket nettverksforbindelse",
    choice3: "En type datavirus",
    choice4: "En nettleserfeil",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hva var det første programmeringsspråket?",
    choice1: "Fortran",
    choice2: "Python",
    choice3: "C++",
    choice4: "Java",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hva er forskjellen mellom Wi-Fi og Ethernet når det gjelder nettverkstilkobling?",
    choice1: "Wi-Fi bruker trådløs teknologi, mens Ethernet bruker kabler",
    choice2: "Wi-Fi er raskere enn Ethernet",
    choice3: "Ethernet er trådløst, mens Wi-Fi bruker kabler",
    choice4: "Det er ingen forskjell mellom Wi-Fi og Ethernet",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  },
  {
    question: "Hva er cookies, og hvorfor brukes de i nettlesere?",
    choice1: "Små datafiler som lagres på datamaskinen for å huske informasjon om brukeren",
    choice2: "En type kjeks som spises mens du surfer på nettet",
    choice3: "En form for datavirus",
    choice4: "Et annet navn for nettlesere",
    answer: 1,
    mediaType: "none",
    mediaSource: "path"
  }
];

const CORRECT_TAX = 10;
const INCORRECT_TAX = 15;
const MAX_QUESTIONS = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }

  document.getElementById("questionVideo").pause();
  document.getElementById("questionAudio").pause();

  questionCounter++;
  progressText.innerText = `Spørsmål ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];

  question.innerText = currentQuestion.question;

  if (currentQuestion.mediaType === "video") {
    document.getElementById("questionVideo").style.display = "block";
    document.getElementById("questionVideo").src = currentQuestion.mediaSource;
    document.getElementById("questionVideo").play();
    document.getElementById("question").style.display = "none";
  } else if (currentQuestion.mediaType === "audio") {
    document.getElementById("questionAudio").style.display = "block";
    document.getElementById("questionAudio").src = currentQuestion.mediaSource;
    document.getElementById("questionAudio").play();
    document.getElementById("question").style.display = "none";
  } else if (currentQuestion.mediaType === "image") {
    document.getElementById("questionImage").style.display = "block";
    document.getElementById("questionImage").src = currentQuestion.mediaSource;
    document.getElementById("question").style.display = "none";
  } else {
    document.getElementById("questionVideo").style.display = "none";
    document.getElementById("questionAudio").style.display = "none";
    document.getElementById("questionImage").style.display = "none";
    document.getElementById("question").style.display = "block";
  }


  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);

  acceptingAnswers = true;
  startTimer();
};

startTimer = () => {
  let timeRemaining = 10;

  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerText = timeRemaining;

  timer = setInterval(() => {
    timeRemaining--;

    timerDisplay.innerText = timeRemaining;

    if (timeRemaining === 0) {
      stopTimer();
      handleTimeout();
    }
  }, 1000);
};

stopTimer = () => {
  clearInterval(timer);
};

handleTimeout = () => {
  getNewQuestion();
};

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

decrementScore = (num) => {
  score = Math.max(0, score - num);
  scoreText.innerText = score;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    stopTimer();

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    } else if (classToApply === "correct") {
      incrementScore(CORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

startGame();