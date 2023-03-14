var startButton = document.querySelector("#start-btn");
var timer = document.querySelector("#timer");
var guessingWord = document.querySelector("#guessing-word");
var winsSpan = document.querySelector("#wins");
var lossesSpan = document.querySelector("#losses");

var wins = 0;
var losses = 0;
var countdown = 0;
var wordBank = ["Javascript", "Style", "Variable", "Object", "Array"];

var wordToGuess;
var blankWord = [];

function startGame() {
  startInterval();
  blankWord = [];
  wordToGuess = wordBank[Math.floor(Math.random() * wordBank.length)];
  for (var i = 0; i < wordToGuess.split("").length; i++) {
    blankWord.push("_");
  }
  renderBlankWord(blankWord.join(""));
  document.addEventListener("keydown", function (event) {
    handleGuess(event.key);
  });
}

function handleGuess(letter) {
  if (wordToGuess.split("").includes(letter)) {
    // figure out where in word to guess it exists
    for (let i = 0; i < wordToGuess.split("").length; i++) {
      if (wordToGuess.split("")[i] === letter) {
        blankWord[i] = letter;
        renderBlankWord(blankWord.join(""));
      }
    }
  }
  checkWin();
}

function checkWin() {
  if (!blankWord.includes("_")) {
    console.log("You win!");
    saveWin();
  }
}

function startInterval() {
  countdown = 10;
  const interval = setInterval(function () {
    if (countdown) {
      countdown--;
      timer.textContent = countdown;
    }
  }, 1000);
}

function renderBlankWord(word) {
  guessingWord.textContent = word;
}

function saveWin() {
  localStorage.setItem("wins", wins);
}

function saveLoss() {
  localStorage.setItem("losses", losses);
}

function renderWinsAndLosses() {
  winsSpan.textContent = wins;
  lossesSpan.textContent = losses;
}

function getWinsAndLosses() {
  var savedWins = localStorage.getItem("wins");
  var savedLosses = localStorage.getItem("losses");
  if (savedWins !== null) {
    wins = savedWins;
  }
  if (savedLosses !== null) {
    losses = savedLosses;
  }
  renderWinsAndLosses();
}

function init() {
  getWinsAndLosses();
  renderWinsAndLosses();
}

startButton.addEventListener("click", startGame);

init();
