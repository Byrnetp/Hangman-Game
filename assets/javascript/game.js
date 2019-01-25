//Building game code as an object
let hangmanGame = {};

//Setting a wordbank and caching gameplay DOM elements for easy access
hangmanGame.wordbank = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Ceres', 'asteroid', 'meteor', 'meteoroid', 'meteorite', 'comet', 'galaxy', 'star', 'nebula', 'Andromeda', 'eclipse', 'umbra', 'penumbra', 'Sirius', 'Betelgeuse', 'Rigel', 'supernova', 'aurora', 'crater', 'Moon', 'Phobos', 'Deimos', 'Europa', 'Ganymede', 'Callisto', 'Titan', 'Mimas', 'Enceladus', 'constellation', 'equinox', 'crescent', 'gibbous', 'sunspot', 'transit', 'twilight', 'waning', 'waxing', 'zenith'];
hangmanGame.wordEl = document.getElementById('wordDisplay');
hangmanGame.remainingEl = document.getElementById('guessesRemaining');
hangmanGame.prevGuessesEl = document.getElementById('prevGuesses');
hangmanGame.winSound = new Audio('./assets/audio/happyRingtone.wav');

//Initialization method
hangmanGame.ini = function() {
    //Choose word from bank and initialize variables
    hangmanGame.chosenWord = hangmanGame.wordbank[Math.floor(Math.random() * hangmanGame.wordbank.length)];
    hangmanGame.blanks = '';
    hangmanGame.guesses = 12;
    hangmanGame.prevGuesses = '';

    //Create blanks
    for (let i = 0; i < hangmanGame.chosenWord.length; i++) {
        hangmanGame.blanks += '_ ';
    }

    //initailaze DOM gameplay elements
    hangmanGame.wordEl.innerText = hangmanGame.blanks;
    hangmanGame.remainingEl.innerText = `${hangmanGame.guesses} guesses remaining`;
    hangmanGame.prevGuessesEl.innerText = 'Previous guesses: ';
}

//Update method
hangmanGame.update = function() {

    //Update blanks
    for (let i = 0; i < hangmanGame.chosenWord.length; i++) {
        if (hangmanGame.chosenLetter.toLocaleLowerCase() === hangmanGame.chosenWord[i].toLowerCase()) {
            let start = hangmanGame.blanks.slice(0, 2 * i);
            let end = hangmanGame.blanks.slice(2 * i + 1); 
            hangmanGame.blanks = start + hangmanGame.chosenWord[i] + end;
        }
    }

    //Update DOM
    hangmanGame.wordEl.innerText = hangmanGame.blanks;
    hangmanGame.guesses -= 1;
    hangmanGame.remainingEl.innerText = `${hangmanGame.guesses} Guesses remaining`;
    hangmanGame.prevGuesses += hangmanGame.chosenLetter + ' ';
    hangmanGame.prevGuessesEl.innerText = 'Previous Guesses: ' + hangmanGame.prevGuesses;

    //if Win
    if (hangmanGame.blanks.indexOf('_') === -1) {
        hangmanGame.prevGuessesEl.innerText = 'You Win! Congratulations!';
        hangmanGame.winSound.play();
        setTimeout(() => hangmanGame.ini(), 4000);
    }

    //if Lose
    else if (hangmanGame.guesses === 0) {
        hangmanGame.prevGuessesEl.innerText = `Sorry, the correct word was ${hangmanGame.chosenWord}. Try again...`;
        setTimeout(() => hangmanGame.ini(), 4000);
    }
}

//Event listener
document.addEventListener('keyup', (event) => {
    if (hangmanGame.wordEl.innerText === "Press any key to get started!") {
        hangmanGame.ini();
    }
    else if (/\b\w\b/.test(event.key)) {
        if (hangmanGame.prevGuessesEl.innerText.indexOf('Previous') === 0) { //if win/lose, don't update again until reinitialization
            hangmanGame.chosenLetter = event.key;
            hangmanGame.update();
        }
    }
});