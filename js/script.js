const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const guessProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const displayGuess = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector("play-again");

const word = "magnolia";
const letterGuesses = [];


const placeholder = function (word) {
    const placeholderLetters = [];
    for(const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    } 
    guessProgress.innerText = placeholderLetters.join("");
};

placeholder(word);


guessButton.addEventListener("click", function(e){
   e.preventDefault();
   guessMessage.innerText = "";
   const guess = letterInput.value;
   
   const validatedGuess = validateInput(guess);
if (validatedGuess){
    makeGuess(guess);
}
letterInput.value ="";
});

const validateInput = function(input){
const acceptedLetter = /[a-zA-Z]/;
if(input.length === 0){
    guessMessage.innerText = "Please enter a letter.";
} else if (input.length > 1){
    guessMessage.innerText = "Please enter a single letter.";
} else if(!input.match(acceptedLetter)){
    guessMessage.innerText = "Please enter a letter from A to Z.";
} else {
    return input;
}
};

const makeGuess = function (guess){
   guess = guess.toUpperCase();
   if (letterGuesses.includes(guess)) {
    guessMessage.innerText = "You already guessed that letter, try again.";
   } else {
    letterGuesses.push(guess);
    console.log(letterGuesses);
   }
};