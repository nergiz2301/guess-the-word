
const ullist=document.querySelector(".guessed-letters");
const button=document.querySelector(".guess");
const letterI=document.querySelector(".letter");
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
  placeholder(word);
};

// Fire off the game
getWord();


// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  // Focus on letter input
  const placeholderLetters = [];
  for (const letter of word) {
    //console.log(letter);
    placeholderLetters.push("●");
  }
  progress.innerText = placeholderLetters.join("");
};

// Fire off the game


button.addEventListener("click",function(e){
    e.preventDefault();
    message.innerText= "";
    const inputV=letterI.value;
    const goodGuess= checkInput(inputV);
    if (goodGuess){
        makeGuess(inputV);
    }
    letterI.value="";
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
      return input;
}};




const makeGuess=function(inputV){
    inputV = inputV.toUpperCase();
    if (guessedLetters.includes(inputV)){
        message.innerText="You already guessed that letter, silly. Try again.";
    }else {
        guessedLetters.push(inputV);
        console.log(guessedLetters);
        updateGuessesRemaining(inputV)
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
  const updateGuessesRemaining = function (inputV) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(inputV)) {
      // womp womp - bad guess, lose a chance
      message.innerText = `Sorry, the word has no ${inputV}.`;
      remainingGuesses -= 1;
    } else {
      message.innerText = `Good guess! The word has the letter ${inputV}.`;
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
  

