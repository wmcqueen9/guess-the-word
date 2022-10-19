const guessedLetters=document.querySelector(".guessed-letters");
const guessButton=document.querySelector(".guess");
const guessLetter=document.querySelector(".letter");
const progressWord=document.querySelector(".word-in-progress");
const remainingGuess=document.querySelector(".remaining");
const span=document.querySelector(".remaining span");
const message=document.querySelector(".message");
const hiddenButton=document.querySelector(".play-again");
const word="magonlia";

const reveal=function(word){
    const revealletters=[]; // an array for the 8 circle symbols
    for(const letter of word){
        console.log(letter)
        revealletters.push("●")
    }
    progressWord.innerText=revealletters.join("");
};
reveal(word);

guessButton.addEventListener("click", function(e){
e.preventDefault();
const capture=guessLetter.value;
console.log(capture);
guessLetter.value="";
});
