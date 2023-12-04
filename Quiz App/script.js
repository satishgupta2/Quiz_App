const questions = [
    {
        question: "Which of the following is not a front-end technology?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "SQL", correct: true },
            { text: "JavaScript", correct: false },
        ]

    },
    {
        question: "Which of the following is a type of pop-up box in JavaScript?",
        answers: [
            { text: "alert", correct: true },
            { text: "console", correct: false },
            { text: "DOM", correct: false },
            { text: "canvas", correct: false },
        ]
    },
    {
        question: "Which of the following is an array method in JavaScript?",
        answers: [
            { text: "map", correct: false },
            { text: "every", correct: false },
            { text: "reduce", correct: false },
            { text: "all of the above ", correct: true },
        ]
    },
    {
        question: "DOM stands for ____.",
        answers: [
            { text: "Document Object Method", correct: false },
            { text: "Direct Object model", correct: false },
            { text: "Document Object Model", correct: true },
            { text: "Document Over Model ", correct: false },
        ]
    }

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-Btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBTn = e.target;
    const isCorrect = selectedBTn.dataset.correct === "true";
    if (isCorrect) {
        selectedBTn.classList.add("correct");
        score++;
    } else {
        selectedBTn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}

function  showScore(){
    resetState();
    questionElement.innerHTML =`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML ="Play Again";
    nextButton.style.display ="block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();

