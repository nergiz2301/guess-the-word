<<<<<<< HEAD
const ullist=document.querySelector(".guessed-letters");
const button=document.querySelector(".guess");
const letter=document.querySelector(".letter");
const progress=document.querySelector(".word-in-progress");
const remainingGuessesElement=document.querySelector(".remaining");
const span=document.querySelector(".remaining span");
const message=document.querySelector(".message");
const replayMessage=document.querySelector(".play-again");

let word="magnolia";
let guessedLetters=[];
let remainingGuesses=8;

const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  startGame(word);
};

// Fire off the game
getWord();
=======
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia"; // Default word if request is unsuccessful
let guessedLetters = [];
let remainingGuesses = 8; 

//  Choose a random word
const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/redrambles/c72ae70504e304519b0e187b0f3dc1a4/raw/72db8cf89b7f5e6f804527c879e800bd6fb0d93c/words.txt");
  if (!response.ok) {
    // If we can't fetch the file for some reason, use default word
    placeholder(word);
    console.log("Response failed - using default word");
  } else {
    // go the desired response
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    if (word.length > 10) {
      getWord();
    } else {
      placeholder(word);
    }
  }
};

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  // Focus on letter input
  letterInput.focus();
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("☀️");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

// Fire off the game
getWord();

guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Focus on letter input
  letterInput.focus();
  // Empty message paragraph
  message.innerText = "";
  // Let's grab what was entered in the input
  const guess = letterInput.value;
  // Let's make sure that it is a single letter
  const goodGuess = validateInput(guess);
>>>>>>> 729664d1169ce77289eb54661c3353059939c270

const startGame=function(word){
  const startGameLetters = [];
  for (const letter of word) {
    // console.log(letter);
    startGameLetters.push("●");
  }
<<<<<<< HEAD
  progress.innerText = startGameLetters.join("");


};
startGame(word);

button.addEventListener("click",function(e){
    e.preventDefault();
    message.innerText= "";
    const input=letter.value;
    const goodGuess= checkInput(input);
    if (goodGuess){
        makeGuess(input);
    }
    letter.value="";
    

});
const checkInput= function(input){
    const acceptedLetter= /[a-zA-Z]/;
    if(input.length === 0){
    message.innerText="Enter a letter";
    }else if (input.length > 1){
    message.innerText="Enter only one letter";
    }else if (!input.match(acceptedLetter)){
    message.innerText="Enter only a letter";
    } else{
=======
  letterInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    // Did you type more than one letter?
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    // Did you type a number, a special character or some other non letter thing?
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    // We finally got a single letter, omg yay
>>>>>>> 729664d1169ce77289eb54661c3353059939c270
    return input;
    }
};

<<<<<<< HEAD
const makeGuess=function(input){
    input = input.toUpperCase();
    if (guessedLetters.includes(input)){
        message.innerText="You already guessed that letter, silly. Try again.";
    }else {
        guessedLetters.push(input);
        console.log(guessedLetters);
        updateGuessesRemaining(input)
        showUlList();
        updateWordInProgress(guessedLetters);
      
    }
};
const showUlList = function () {
    ullist.innerHTML = "";
    for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = letter;
      ullist.append(li);
    }
};
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
      } else {
        revealWord.push("●");
      }
    }
    // console.log(revealWord);
    progress.innerText = revealWord.join("");
    checkIfWin();
  };
  const updateGuessesRemaining = function (input) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(input)) {
      // womp womp - bad guess, lose a chance
      message.innerText = `Sorry, the word has no ${input}.`;
      remainingGuesses -= 1;
    } else {
      message.innerText = `Good guess! The word has the letter ${input}.`;
    }
  
    if (remainingGuesses === 0) {
      message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
      startOver();
    } else if (remainingGuesses === 1) {
      span.innerText = `${remainingGuesses} guess`;
    } else {
      span.innerText = `${remainingGuesses} guesses`;
    }
  };
  const checkIfWin = function () {
    if (word.toUpperCase() === progress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
      startOver();
    }
  };
  const startOver = function () {
    button.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    ullist.classList.add("hide");
    replayMessage.classList.remove("hide");
  };

  replayMessage.addEventListener("click", function () {
    // reset all original values - grab new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    span.innerText = `${remainingGuesses} guesses`;
    ullist.innerHTML = "";
    message.innerText = "";
    // Grab a new word
    getWord();
    button.classList.remove("hide");
    replayMessage.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    ullist.classList.remove("hide");
  });
=======
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(guess);
    updateGuessesRemaining(guess);
    // Show user what they already guessed
    showGuessedLetters();
    // New letter guessed - let's see if we're right
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersElement.innerHTML = "";

  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("☀️");
    }
  }
  // console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    // womp womp - bad guess, lose a chance
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `GAME OVER. The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};


const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
  }
};

const startOver = function () {
  // Show play again button and shift focus there - hide guess button and letters
  letterInput.blur();
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
  playAgainButton.focus();
};

playAgainButton.addEventListener("click", function () {
  // reset all original values - grab new word
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  getWord();
  // show the right UI elements
  guessLetterButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});
>>>>>>> 729664d1169ce77289eb54661c3353059939c270
