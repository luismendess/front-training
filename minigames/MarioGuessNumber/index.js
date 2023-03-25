const gameNumberElement = document.querySelector(".game-number");
const gameFeedbackElement = document.querySelector(".game-feedback");
const gameGuessElement = document.querySelector(".game-guess");
const gameHealthNumberElement = document.querySelector(".game-health-number");
const gameHealthElement = document.querySelector(".game-health-bar");
const gamePlayButton = document.querySelector(".game-button-play");
const gameResetButton = document.querySelector(".game-button-reset");

let gameHealth;
let GameOver;
let randomGuessNumber;

const updateData = (element, message) => {
    element.textContent = message;
}

const init = () => {
    gameHealth = 100;
    GameOver = false;
    randomGuessNumber = Math.trunc(Math.random() * 10) + 1;
    updateData(gameHealthNumberElement, "100%");
    updateData(gameFeedbackElement, "What is your guess?");
    updateData(gameNumberElement, "?");
    gameGuessElement.value = "";
    gameHealthElement.style.background = "green";
    gameHealthElement.style.width = `${gameHealth}%`;
};

init();

const playGame = () =>{
    const guess = Number(gameGuessElement.value);
    if(!GameOver){
        if(guess <= 0){
            updateData(gameFeedbackElement, "Enter a valid number!");
        }else if(guess == randomGuessNumber){
            gameNumberElement.textContent = randomGuessNumber;
            updateData(gameFeedbackElement, "You win!!\nReset to play again...");
        }else if(guess !== randomGuessNumber){
            if(gameHealth > 20){
                updateData(gameFeedbackElement, guess > randomGuessNumber ? "Try a lower number!" : "Try a higher number!");
                gameHealth -= 20;
                gameHealthElement.style.width = `${gameHealth}%`;
                updateData(gameHealthNumberElement, `${gameHealth}%`);
                if(gameHealth < 50){
                    gameHealthElement.style.background = "red";
                }
            }else{
                updateData(gameFeedbackElement, "Game Over!!");
                gameHealth = 0;
                gameHealthElement.style.width = `${gameHealth}%`;
                updateData(gameHealthNumberElement, "0%");
                GameOver = true;
            }
        }
    }else{
        updateData(gameFeedbackElement, "Reset to play again!!");
    }
};

gamePlayButton.addEventListener("click", playGame);
gameResetButton.addEventListener("click", init);