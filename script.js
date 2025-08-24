const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const progressText = document.getElementById("progress-text");

const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Example questions (you can expand this set)
const questionBank = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Picasso", "Da Vinci", "Van Gogh", "Rembrandt"],
        answer: "Da Vinci"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        answer: "Pacific"
    },
    {
        question: "What year did World War II end?",
        options: ["1945", "1939", "1918", "1960"],
        answer: "1945"
    }
];

function startGame() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    score = 0;
    currentQuestionIndex = 0;

    // Pick 10 random questions (or less if not enough)
    questions = shuffleArray(questionBank).slice(0, 10);

    showQuestion();
}

function showQuestion() {
    let current = questions[currentQuestionIndex];
    questionText.textContent = current.question;
    optionsContainer.innerHTML = "";

    current.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.addEventListener("click", () => selectAnswer(btn, current.answer));
        optionsContainer.appendChild(btn);
    });

    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function selectAnswer(selectedBtn, correctAnswer) {
    const isCorrect = selectedBtn.textContent === correctAnswer;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                endGame(true);
            }
        }, 800);
    } else {
        selectedBtn.classList.add("wrong");
        endGame(false);
    }
}

function endGame(won) {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    if (won) {
        resultTitle.textContent = "🎉 Congratulations!";
        resultText.textContent = "You answered all questions correctly!";
    } else {
        resultTitle.textContent = "Game Over!";
        resultText.textContent = `You answered ${score} question(s) correctly.`;
    }
}

function restartGame() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Event Listeners
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
