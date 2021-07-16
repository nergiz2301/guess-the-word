const ullist=document.querySelector(".guessed-letters");
const button=document.querySelector(".guess");
const letter=document.querySelector(".letter");
const progress=document.querySelector(".word-in-progress");
const remainGuesses=document.querySelector(".remaining");
const span=document.querySelector(".remaining span");
const message=document.querySelector(".message");
const replayMessage=document.querySelector(".play-again");
const word="magnolia";

const startGame=function(){
    progress.innerText="●●●●●●●●";

};
startGame(word);

button.addEventListener("click",function(e){
    e.preventDefault();
    const input=letter.value;
    console.log(input);
    letter.value="";

})
