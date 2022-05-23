class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.index = 0;
  }
  getQuestionByIndex() {
    return this.questions[this.index];
  }
  checkForCorrectAnswer(answer) {
    let question = this.getQuestionByIndex();
    if (question.isCorrectAnswer(answer)) {
      this.score++;
    }
    this.index++;
  }
  isEnded() {
    return this.index === this.questions.length;
  }
}

class Question {
  constructor(questionText, choices, answer) {
    this.text = questionText;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(selectedChoice) {
    return this.answer === selectedChoice;
  }
}

let questions = [
  new Question( "Which of the following modifiers is applicable for both inner and outer classes?",["Private", "Protected", "Static", "Public"],"Public"),
  new Question( "Which annotation is used to show the ownership of the relationship in a table?",["@Column", "@Join Column", "@Id", "@Generated Value"],"@Join Column"),
  new Question( "Which one is a Thread Safe object?",["SessionFactory", "Session", "Factory", "None of the above"],"SessionFactory"),
  new Question( "Which of the following attributes is used to make the association between entities bidirectional?",["strategy", "mappedBy", "fetch", "referencedColumnName"],"mappedBy"),
  new Question( "Which key maintains the referential integrity in a relation?",["Super", "Foreign", "Primary", "Candidate"],"Foreign"),
];

function loadQuestions() {
  if (quiz.isEnded()) {
    showFinalScores();
    return;
  }

  let currentQuestion = quiz.getQuestionByIndex();
  let questionElement = document.getElementById("question"); //<p id="question"></p>
  questionElement.innerHTML = currentQuestion.text;

  let displayedChoices = currentQuestion.choices;
  for (let i = 0; i < displayedChoices.length; i++) {
    let eachChoiceElement = document.getElementById("choice" + i); //<span id="choice0"></span
    eachChoiceElement.innerHTML = displayedChoices[i];

    let eachChoiceBtn = document.getElementById("btn" + i); //<button id="btn0"></button>
    eachChoiceBtn.onclick = function () {
      quiz.checkForCorrectAnswer(displayedChoices[i]); // Verification, scoring and incrementing the question index
      loadQuestions();
    };
  }

  showProgress();
}

let quiz = new Quiz(questions);
loadQuestions();

function showFinalScores() {
  let resPercent = (quiz.score / questions.length) * 100;
  let scoresHTML = `
        <h1>Final Score</h1>
        <h2 id='score'>Your Score is: ${quiz.score} </h2>
        <h2> Overall percentage is: ${resPercent}% </h2>
        <h3>Thank You</h3>
    `;
  let quizCanvas = document.getElementById("quiz");
  quizCanvas.innerHTML = scoresHTML;
}

function showProgress() {
  let questionNumber = quiz.index + 1;
  let progressElement = document.getElementById("progress");
  progressElement.innerHTML = `Question ${questionNumber} of ${quiz.questions.length}`;
}