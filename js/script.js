const guessedLettersElement=document.querySelector(".guessed-letters");
const guessButton=document.querySelector(".guess");
const guessLetter=document.querySelector(".letter");
const progressWord=document.querySelector(".word-in-progress");
const remainingGuessElemwnt=document.querySelector(".remaining");
const span=document.querySelector(".remaining span");
const message=document.querySelector(".message");
const hiddenButton=document.querySelector(".play-again");
let word="magonlia";
const guessedLetters=[];
let remainingGuesses = 8;

const getWord= async function(){
    const res=await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data=await res.text();
    const wordArray = data.split("\n");
   // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    reveal(word);

};
getWord();
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

message.innerText="";
const guess=guessLetter.value;

const valid=letterInput(guess);

if(valid) {
    makeGuess(guess);
}
guessLetter.value="";
});

const letterInput=function(input){
    const acceptedLetter=/[a-zA-Z]/;
    if(input.length===0) {
        message.innerText= `Enter a letter`;}
        else if (input.length>1){
            message.innerText=`Please enter one letter`;
        } else if(!input.match(acceptedLetter)){
            message.innerText=`Please enter a word`;
        } else{
            return input;
        }
    
    };

      const makeGuess=function(guess){
        guess=guess.toUpperCase();
        if (guessedLetters.includes(guess)){ 
            message.innerText="Made that Guess already";
          
        }else{
            guessedLetters.push(guess);
            console.log(guessedLetters);
            guessCount(guess);
            updateLetter();
            updateWord(guessedLetters);
        }
    };

    const updateLetter =function(){
        guessedLettersElement.innerHTML="";
        for (const letter of guessedLetters){
            const li=document.createElement("li");
            li.innerText=letter;
            guessedLettersElement.append(li);
        }
    };

    const updateWord=function(guessedLetters){
        const wordUpper= word.toUpperCase();
        const wordArray=wordUpper.split("");
        const revealWord=[];
        for(const letter of wordArray){
         if(guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
             }else{
            revealWord.push("●");
        }
    }
      // console.log(wordArray);
       progressWord.innerText=revealWord.join("");
       checkWon();
    };
    const guessCount=function(guess){
       const upperWord= word.toUpperCase();
        if(!upperWord.includes(guess)){
            message.innerText=`This word does not have a ${guess}`;
            remainingGuesses -= 1;
        }else{
            message.innerText=`Hey! This word does have a ${guess}`;
        }


        if(remainingGuesses===0){
            message.innerText=`GAME OVER, sorry but the word was ${word}`;
        }else if (remainingGuesses ===1){
            span.innerText=`1 guess`
        }
        else{
            span.innerText=`You have ${remainingGuesses} guess remaining`;
        }
    };

const checkWon=function(){
    if(word.toUpperCase()==progressWord.innerText){
        message.classList.add("win");
        message.innerHTML='<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};