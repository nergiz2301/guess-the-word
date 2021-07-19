const ullist=document.querySelector(".guessed-letters");
const button=document.querySelector(".guess");
const letter=document.querySelector(".letter");
const progress=document.querySelector(".word-in-progress");
const remainGuesses=document.querySelector(".remaining");
const span=document.querySelector(".remaining span");
const message=document.querySelector(".message");
const replayMessage=document.querySelector(".play-again");
const word="magnolia";
const guessedLetters=[];



const startGame=function(){
    progress.innerText="●●●●●●●●";

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
    checkInput(input);

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
    }
};

const makeGuess=function(input){
    input = input.toUpperCase();
    if (guessedLetters.includes(input)){
        message.innerText="You already guessed that letter, silly. Try again.";
    }else {
        guessedLetters.push(input);
        console.log(guessedLetters);
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
  const checkIfWin = function () {
    if (word.toUpperCase() === progress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };