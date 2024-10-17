import { Quesions } from "./Questions.js";

// console.log(Quesions)

// DOM selecting

let questionArea = document.getElementById("question"),
  answerButton = document.getElementById("answer-buttons"),
  NextButton = document.getElementById("next-btn");

// storing the starting numbers
let currentQuestionNumber = 0;
let score = 0;

const quizeStart = () => {
  currentQuestionNumber = 0;
  score = 0;
  NextButton.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  let suaashlamaraayo = Quesions[currentQuestionNumber];
  let questionNo = currentQuestionNumber + 1;
  questionArea.innerHTML = `${questionNo}: ${suaashlamaraayo.question}`;
  // console.log(suaashlamaraayo.question)

  // reseting the answer`s buttons`
  resetState();

  // the answer section
  suaashlamaraayo.Answers.forEach((answer) => {
    const button = document.createElement("button");
    // console.log(button);
    // console.log(answer.text);
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);

    // Data Attribute
    // Data attribute= is another HTML attribute.
    // it allows us to attach any information to an HTML element.
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      //   console.log(answer.correct);
    }

    //   addEvetlistener for answer
    button.addEventListener("click", getAnswer);
  });
};

// calling the functions
quizeStart();

// reseting the answer`s buttons`
function resetState() {
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function getAnswer(event) {
  const selectedOne = event.target;
  // console.log(selectedOne)
  const corretone = selectedOne.dataset.correct === "true";
  // console.log(corretone)
  if (corretone) {
    selectedOne.classList.add("correct");
    score++;
  } else {
    selectedOne.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  // showing button
  NextButton.style.display = "block";
}

NextButton.addEventListener("click", () => {
  if (currentQuestionNumber < Quesions.length) {
    handleQuestion();
  } else {
    quizeStart();
  }
});

function handleQuestion() {
  currentQuestionNumber++;
  if (currentQuestionNumber < Quesions.length) {
    showQuestion();
  } else {
    scoreShow();
  }
}

function scoreShow() {
  resetState();
  questionArea.innerHTML = `You scored ${score} out of ${Quesions.length}`;
  NextButton.innerHTML = 'Play again';
}
