const guessedLettersElement=document.querySelector(".guessed-letters");
const guessButton=document.querySelector(".guess");
const guessLetter=document.querySelector(".letter");
const progressWord=document.querySelector(".word-in-progress");
const remainingGuess=document.querySelector(".remaining");
const span=document.querySelector(".remaining span");
const message=document.querySelector(".message");
const hiddenButton=document.querySelector(".play-again");
const word="magonlia";
const guessedLetters=[];

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

      const makeGuess=function(myGuess){
        myGuess=myGuess.toUpperCase();
        if (guessedLetters.includes(myGuess)){
            message.innerText="Made that Guess already";
          
        }else{
            guessedLetters.push(myGuess);
            console.log(guessedLetters);
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
const checkWon=function(){
    if(word.toUpperCase()==progressWord.innerText){
        message.classList.add("win");
        message.innerHTML='<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};