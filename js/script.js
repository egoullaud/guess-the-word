const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const guessProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const displayGuess = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector("play-again");
const word = "magnolia";



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
   const guess = letterInput.value;
   console.log(guess);
   letterInput.value ="";
   
});