let currentQuestionIndex = 0;
let totalScore = 0;
let timeRemaining;
let timerInterval;

document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
    let time = parseInt(document.getElementById('time-input').value) || 0;
    if (time <= 0) {
        alert("Please enter a valid time in minutes.");
        return;
    }

    timeRemaining = time * 60;
    document.getElementById('score').innerText = "Score: 0";
    loadQuestions();
}

function loadQuestions() {
    fetch('questions.json')
    .then(response => response.json())
    .then(questions => {
        displayQuestion(questions[currentQuestionIndex]);
        startTimer(questions);
    })
    .catch(error => console.error('Error:', error));
}

function displayQuestion(question) {
    const container = document.getElementById('question-container');
    container.innerHTML = `<h2>${question.question}</h2>`;

    question.answers.forEach((answer, index) => {
        container.innerHTML += `<button onclick="selectAnswer(${index}, ${question.correctAnswer}, ${question.points})">${answer}</button>`;
    });
}

function selectAnswer(selectedIndex, correctIndex, points) {
    if (selectedIndex === correctIndex) {
        totalScore += points;
        document.getElementById('feedback').innerText = "Correct!";
    } else {
        document.getElementById('feedback').innerText = "Wrong!";
    }

    document.getElementById('score').innerText = `Score: ${totalScore}`;
    loadNextQuestion();
}

function loadNextQuestion() {
    // Logic to load next question or end game
}

function startTimer(questions) {
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame();
            return;
        }
        timeRemaining--;
        displayTime();
    }, 1000);
}

function displayTime() {
    const timerElement = document.getElementById('timer');
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('feedback').innerText = "Game over!";
    // Additional end game logic
}
