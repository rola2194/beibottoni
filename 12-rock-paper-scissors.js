//get back score to be an object
jsonScore = localStorage.getItem("score");
let score = JSON.parse(jsonScore);
/* {
        won: 0,
        lost: 0,
        tie: 0,
      }; */

updateScoreElement();

console.log(localStorage.getItem("score"));

let isAutoPlayng = false;
let intervalId;

//const autoPlay = () => {

//};

function autoPlay() {
  if (!isAutoPlayng) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlayng = true;
  } else {
    clearInterval(intervalId);
    isAutoPlayng = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});

document.querySelector(".js-paper-button").addEventListener(`click`, () => {
  playGame("Paper");
});

document.querySelector(".js-scissors-button").addEventListener(`click`, () => {
  playGame("Scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";
  ///////////////////////////////////////////////////////
  if (playerMove === "Scissors") {
    // compare computerMove and Scissor
    if (computerMove === "Rock") {
      result = "Lose.";
    } else if (computerMove === "Paper") {
      result = "Won.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
    ///////////////////////////////////////////////////////
  } else if (playerMove === "Paper") {
    // compare computerMove and Paper
    if (computerMove === "Rock") {
      result = "Won.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "Lose.";
    }
    ///////////////////////////////////////////////////////
  } else if (playerMove === "Rock") {
    // compare computerMove and rock
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "Lose.";
    } else if (computerMove === "Scissors") {
      result = "Won.";
    }
  }
  ///////// updating score /////////////////////////////////
  if (result === "Won.") {
    score.won += 1;
  } else if (result === "Lose.") {
    score.lost += 1;
  } else if (result === "Tie.") {
    score.tie += 1;
  }

  // storing on local and stringify
  storingScore();
  ////////////       //
  document.querySelector(".js-moves").innerHTML = `You
       <img src="images/${playerMove}-emoji.png" class="move-icon" >
       <img src="images/${computerMove}-emoji.png" class="move-icon"> computer`;

  document.querySelector(".js-result").innerHTML = result;

  updateScoreElement();
  // allert pop-up
  /*alert(
          `wins:${score.won}, losses:${score.lost}, ties:${score.tie},` +
            "\n" +
            `You picked ${playerMove}. Computer picked ${computerMove}. You ${result}`
        );*/
}
/////////////////
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins:${score.won}, losses:${score.lost}, ties:${score.tie}, `;
}
function storingScore() {
  localStorage.setItem("score", JSON.stringify(score));
}
function pickComputerMove() {
  let randomNumber = Math.random();
  let computerMove = "";

  // pick a random seed => computerMove
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }

  return computerMove;
}
