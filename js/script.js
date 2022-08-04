// Global Variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector("play-again");


// working word 
let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

//connect to API for words
const getWord = async function(){
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

// display dot where letters will be
const placeholder = function (word) {
    const placeholderLetters = [];
    for(const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    } 
    wordInProgress.innerText = placeholderLetters.join("");
};




guessLetterButton.addEventListener("click", function(e){
   e.preventDefault();
//    empty message
   message.innerText = "";
// input letter
   const guess = letterInput.value;
//check for single letter
   const goodGuess = validateInput(guess);

if (goodGuess){
    makeGuess(guess);
}
letterInput.value ="";
});

const validateInput = function(input){
const acceptedLetter = /[a-zA-Z]/;
if(input.length === 0){ //input empty
    message.innerText = "Please enter a letter.";
} else if (input.length > 1){ //more than one letter
    message.innerText = "Please enter a single letter.";
} else if(!input.match(acceptedLetter)){ // single letter input
    message.innerText = "Please enter a letter from A to Z.";
} else {
    return input;
}
};

const makeGuess = function (guess){
   guess = guess.toUpperCase();
   if (guessedLetters.includes(guess)) {
   message.innerText = "You already guessed that letter, try again.";
   } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateGuessesRemaining();
    showGuessedLetters();
    updateWordinProgress(guessedLetters);
   }
};

const showGuessedLetters = function (){
   //clear list first
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters){   
    //for every letter guessed, create new list item 
    const li = document.createElement("li");
    li.innerText= letter;
    guessedLettersElement.append(li);
    }
};

const updateWordinProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    //splits string into array so letter is in guessedLetters array
    const wordArray = wordUpper.split(""); 
    // console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
//update empty paragrph to show word
wordInProgress.innerText = revealWord.join("");
checkIfWin();
};

const updateGuessesRemaining = function (guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess))  {
            message.innerText = `Sorry, the word does not include ${guess}.`;
            remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }  

    if(remainingGuesses === 0){
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


const checkIfWin = function (){
    if (word.toUpperCase()===wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class "highlight" > You guessed the correct word! Way to go! </p>`;
    }
};


