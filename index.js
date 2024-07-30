let randomNumber = parseInt((Math.random() * 100) + 1);
// console.log(randomNumber);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const previousGuesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const resultParas = document.querySelector('.resultParas');

const p = document.createElement('p');


let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const guessNum = parseInt(userInput.value);
        // console.log(guessNum);
        ValidateGuess(guessNum);
    })
}


function ValidateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please Enter a Valid Number!")
    } else if (guess < 1) {
        alert("Please Enter a Number more than 1!")
    } else if (guess > 100) {
        alert("Please Enter a Number less than 100!")
    } else {
        prevGuess.push(guess);
        if (numGuess === 10) {
            displayGuess(guess);
            if (guess === randomNumber) {
                displayMessage(`You guessed it right!`);
                endGame();
            } else {
                lastResult.innerHTML = "No remaining guesses left!";
                displayMessage(`Game Over! and the Machines Guess Number was ${randomNumber}`);
                endGame();
            }
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}


function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed it right!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Guessed Number is too low!`);
    } else if (guess > randomNumber) {
        displayMessage(`Guessed Number is too high!`);
    }
}

function displayGuess(guess) { // clean up
    userInput.value = '';
    previousGuesses.innerHTML += `${guess}   `;
    numGuess++;
    lastResult.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}


function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    submit.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h3 id="newGame">Start New Game</h3>`;
    p.style.cursor = "pointer";
    p.style.border = "thick solid #fff";
    p.style.borderRadius = "10px"
    p.style.backgroundColor = "black";
    resultParas.appendChild(p);
    // lastResult.innerHTML = "No remaining guesses left!";
    playGame = false;
    newGame();
}


function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', (e) => {
        lowOrHi.innerHTML = '';
        randomNumber = parseInt((Math.random() * 100) + 1);
        // console.log(randomNumber);
        prevGuess = [];
        numGuess = 1;
        previousGuesses.innerHTML = '';
        lastResult.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        submit.removeAttribute('disabled')
        resultParas.removeChild(p);
        playGame = true;
    })
}