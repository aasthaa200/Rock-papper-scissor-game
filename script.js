const choiceButtons = document.querySelectorAll('.choice-btn');
const resultText = document.getElementById('result');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerMoveEl = document.getElementById('player-move');
const computerMoveEl = document.getElementById('computer-move');
const resetBtn = document.getElementById('reset-btn');

const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

const beats = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    if (beats[playerChoice] === computerChoice) {
        return 'win';
    }
    return 'lose';
}

function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        playerScoreEl.textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreEl.textContent = computerScore;
    }
}

function showResult(playerChoice, computerChoice, result) {
    resultText.classList.remove('win', 'lose', 'draw');

    if (result === 'win') {
        resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
        resultText.classList.add('win');
    } else if (result === 'lose') {
        resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
        resultText.classList.add('lose');
    } else {
        resultText.textContent = `It's a draw! Both picked ${playerChoice}`;
        resultText.classList.add('draw');
    }
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    playerMoveEl.textContent = emojis[playerChoice];
    computerMoveEl.textContent = emojis[computerChoice];

    updateScore(result);
    showResult(playerChoice, computerChoice, result);
}

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        playRound(playerChoice);
    });
});

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    playerMoveEl.textContent = '❔';
    computerMoveEl.textContent = '❔';
    resultText.textContent = 'Choose your move!';
    resultText.classList.remove('win', 'lose', 'draw');
});