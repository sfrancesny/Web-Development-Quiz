// Quiz questions
const questions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Technical Mark Language", "High Tech Markup Language"],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    question: "Choose the correct HTML element for the largest heading",
    choices: ["h1", "h3", "head", "heading"],
    correctAnswer: "h1"
  },
  {
    question: "Choose the correct HTML element to define important text",
    choices: ["important", "stong", "em", "b"],
    correctAnswer: "b"
  },
  {
    question: "The title element must be located inside which element?",
    choices: ["head element", "body element", "main element", "a element"],
    correctAnswer: "head element"
  },
  {
    question: "Choose the option that is NOT considered a text formatting tag in HTML",
    choices: ["p", "i", "div", "h1"],
    correctAnswer: "div"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Coloful Style Sheets", "Cascading Style Sheets", "Computational Style Sheets", "Column Style Spread"],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "Where in an HTML document is the correct place to refer to an external style sheet?",
    choices: ["At the end of the document", "In the body section", "In any p tag", "In the head section"],
    correctAnswer: "In the head section"
  },
  {
    question: "What is the correct CSS syntax?",
    choices: ["{img;color:black;}", "{img:color=black;}", "img {color:black;}", "img; [color=back:]"],
    correctAnswer: "img {color:black;}"
  },
  {
    question: "How do you insert a comment in a CSS file?",
    choices: ["//this is a comment//", "/*this is a comment*/", "*this is a comment", "##this is a comment"],
    correctAnswer: "/*this is a comment*/"
  },
  {
    question: " In CSS what does px stand for?",
    choices: ["primary-index", "plug-in", "pieces", "pixels"],
    correctAnswer: "pixels"
  },
  {
    question: "Inside which element do you put JavaScript?",
    choices: ["script", "const", "section", "let"],
    correctAnswer: "script"
  },
  {
    question: "How do we declare a  string value in a variable?",
    choices: ["var myName = Sydney()", "var myName = true", "var myName = 'Sydney'", "var myName = 25"],
    correctAnswer: "var myName = 'Sydney'"
  },
  {
    question: "What can you use to round a number to the nearest integer?",
    choices: ["Math.rnd()", "Math.round()", "rnd()", "mth.rnd()"],
    correctAnswer: "Math.round()"
  },
  {
    question: "In Javascript, what do we call a block of code intended to perform a specific task?",
    choices: ["Function", "String", "Declaration", "Constant"],
    correctAnswer: "Function"
  },
];

// Quiz settings
const quizDuration = 10; // Quiz duration in minutes
const timePenalty = 1; // Time penalty for incorrect answer in minutes

// Global variables
let currentQuestionIndex = 0;
let timeRemaining = quizDuration * 60; // Convert duration to seconds
let timerInterval;

// Function to update the timer
function updateTimer() {
  timeRemaining--;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timeRemainingElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  if (timeRemaining <= 0) {
    endQuiz();
  }
}

// Function to handle user's answer selection
function handleAnswer(event) {
  // ...

  if (selectedChoice === question.correctAnswer) {
    // ...
  } else {
    // ...
    timeRemaining -= timePenalty * 60; // Convert penalty to seconds
    if (timeRemaining < 0) {
      timeRemaining = 0;
    }
  }
}

// DOM elements
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const timeRemainingElement = document.getElementById("time-remaining");
const feedbackElement = document.getElementById("feedback");
const scoreForm = document.getElementById("score-form");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score");

// Event listeners
startButton.addEventListener("click", startQuiz);
questionContainer.addEventListener("click", handleAnswer);
saveScoreButton.addEventListener("click", saveScore);

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

// Function to update the timer
function updateTimer() {
  timeRemaining--;
  timeRemainingElement.textContent = timeRemaining;
  if (timeRemaining <= 0) {
    endQuiz();
  }
}

// Function to show a question
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <h2>${question.question}</h2>
    <ul>
      ${question.choices.map(choice => `<li>${choice}</li>`).join("")}
    </ul>
  `;
}
// Function to handle user's answer selection
function handleAnswer(event) {
  if (event.target.matches("li")) {
    const selectedChoice = event.target.textContent;
    const question = questions[currentQuestionIndex];
    
    // Update the selectedAnswer property of the question object
    question.selectedAnswer = selectedChoice;
    
    if (selectedChoice === question.correctAnswer) {
      feedbackElement.textContent = "Correct!";
    } else {
      feedbackElement.textContent = "Incorrect!";
      timeRemaining -= timePenalty;
      if (timeRemaining < 0) {
        timeRemaining = 0;
      }
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
}

// Function to calculate the score
function calculateScore() {
  const totalQuestions = questions.length;
  let correctAnswers = 0;

  questions.forEach(question => {
    if (question.selectedAnswer === question.correctAnswer) {
      correctAnswers++;
    }
  });

  const score = (correctAnswers / totalQuestions) * 100;
  return score.toFixed(2); // Return the score rounded to 2 decimal places
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.innerHTML = `
    <div class="quiz-over">
      Quiz Over! Your score: <span>${calculateScore()}%</span>
    </div>
  `;
  scoreForm.style.display = "block";
}
