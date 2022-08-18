const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
var timeEl = document.getElementById("timer");
var timeLeft;
let score;
var timerInt;
let shuffledQuestions;
let currentQuestionIndex;
startButton.addEventListener("click", startGame);

function startGame() {
  startButton.classList.add("hide");
  answerButtonsElement.classList.remove("hide");
  questionElement.classList.remove("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  timerInt = setInterval(time, 1000);
  setNextQuestion();
  score = 0;
  scoreElement.textContent = score;
  timeLeft = 60;
}

function time() {
  timeLeft--;
  timeEl.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerInt);
    let nameScore1 = prompt("Please enter your name and score.");
    localStorage.setItem("Name & Score", nameScore1);
  }
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
// if answer is correct, timer stay the same, if answer is
// wrong take off time. make final score = time left
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  const incorrect = selectedButton.dataset.incorrect;
  if (correct == "true") {
    score++;
    // subtracting a second if answer is wrong
    if ((correct = !"true")) {
      timeLeft--;
    }
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    answerButtonsElement.classList.add("hide");
    questionElement.classList.add("hide");
    let nameScore = prompt("Please enter your name and score.");
    localStorage.setItem("Name & Score", nameScore);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
const questions = [
  {
    question: "Which team did Lawrence Taylor play for?",
    answers: [
      { text: "Giants", correct: true },
      { text: "Jets", correct: false },
      { text: "Cowboys", correct: false },
      { text: "Eagles", correct: false },
    ],
  },
  {
    question: "Which is CeeDEE Lamb's jersey number?",
    answers: [
      { text: "88", correct: true },
      { text: "85", correct: false },
      { text: "89", correct: false },
      { text: "2", correct: false },
    ],
  },
  {
    question:
      "Which player on the Pelicans was drafted first overall and went to Duke?",
    answers: [
      { text: "Zion Williamson", correct: true },
      { text: "Cj McCollumn", correct: false },
      { text: "Brandon Ingram", correct: false },
      { text: "Jayson Tatum", correct: false },
    ],
  },
  {
    question: "Question 4 - Who is the french forward on Paris Saint Germain?",
    answers: [
      { text: "Neymar", correct: false },
      { text: "Messi", correct: false },
      { text: "Ronaldo", correct: false },
      { text: "Mbappe", correct: true },
    ],
  },
  {
    question: "Which NFL player dates Olivia Culpo?",
    answers: [
      { text: "Joe Burrow", correct: false },
      { text: "Christian McCaffrey", correct: true },
      { text: "Russell Wilson", correct: false },
      { text: "Tom Brady", correct: false },
    ],
  },
  {
    question: "Which MLB star is sucessfull at both batting and pitching?",
    answers: [
      { text: "Shohei Ohtani", correct: true },
      { text: "Mike Trout", correct: false },
      { text: "Garrit Cole", correct: false },
      { text: "Fernando Tatis Jr.", correct: false },
    ],
  },
  {
    question:
      "Which Colorado Avalanche player won the Conn Smythe Trophy for most valuable player in the Stanley Cup?",
    answers: [
      { text: "Nathan Mckinnon", correct: false },
      { text: "Cale Makar", correct: true },
      { text: "Nazem Kadri", correct: false },
      { text: "Steven Stamkos", correct: false },
    ],
  },
  {
    question: "How many championships has Steph Curry Won?",
    answers: [
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "2", correct: false },
    ],
  },
  {
    question: "Who holds the record for most homeruns in a single season?",
    answers: [
      { text: "Roger Marris", correct: false },
      { text: "Mark Maguire", correct: false },
      { text: "Aaron Judge", correct: false },
      { text: "Barry Bonds", correct: true },
    ],
  },
  {
    question:
      "Which football player removed his pads and quit the team in the middle of an NFL game?",
    answers: [
      { text: "Julio Jones", correct: false },
      { text: "Antonio Brown", correct: true },
      { text: "Tom Brady", correct: false },
      { text: "Jamarcus Russell", correct: false },
    ],
  },
];
