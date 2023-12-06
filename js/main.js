/*
To add:
Reset game, reset score - done
Save current score in LocalStorage
Save moves and fights in LocalStorage
Media Queries - done
*/
// let playerScoreVal;
// let botScoreVal;

const playerActivity = document.querySelector('#playerActivity');
const botActivity = document.querySelector('#botActivity');
const reset = document.getElementById('reset');
const systemMsg = document.querySelectorAll('.msg');
const scoresFromStorage = getScoresFromStorage();

document.getElementById('rock').onclick = playerThrowsRock;
document.getElementById('water').onclick = playerThrowsWater;
document.getElementById('fire').onclick = playerThrowsFire;

//VARIABLES
let botScoreText = document.getElementById('botScore'); //0
let playerScoreText = document.getElementById('playerScore');

let botScore = scoresFromStorage.botScore;
let playerScore = scoresFromStorage.playerScore;

// GAME FUNCTION
function playerThrowsRock() {
  let botsWeapon = getRandomWeapon();
  playerBend('rock');
  botBend(botsWeapon);
  checkWhoWon(botsWeapon, 'rock');
}

function playerThrowsWater() {
  let botsWeapon = getRandomWeapon();
  playerBend('water');
  botBend(botsWeapon);
  checkWhoWon(botsWeapon, 'water');
}

function playerThrowsFire() {
  let botsWeapon = getRandomWeapon();
  playerBend('fire');
  botBend(botsWeapon);
  checkWhoWon(botsWeapon, 'fire');
}
// RANDOMIZE BOT
function getRandomWeapon() {
  var randomNumber = Math.random();
  if (randomNumber < 0.33) {
    botsWeapon = 'water';
  } else if (randomNumber < 0.66) {
    botsWeapon = 'fire';
  } else if (randomNumber < 0.99) {
    botsWeapon = 'rock';
  }
  return botsWeapon;
}

// WHO WON MATCH SECTION
function checkWhoWon(botsWeapon, playersWeapon) {
  if (playerScore !== 10 && botScore !== 10) {
    if (botsWeapon == playersWeapon) {
      displayCompleteMessage('You Both Retreated!');
    } else if (
      (botsWeapon == 'water' && playersWeapon == 'fire') ||
      (botsWeapon == 'fire' && playersWeapon == 'rock') ||
      (botsWeapon == 'rock' && playersWeapon == 'water')
    ) {
      increaseBotScore();
    } else {
      increasePlayerScore();
    }
  }
}
// INCREASE SCORE
function increaseBotScore() {
  botScore += 1;
  botScoreText.innerText = botScore;
  saveScoreToStorage();
  displayCompleteMessage("You've Been Defeated!");

  if (botScore == 10) {
    document.getElementById('warImg').src = '/images/thatsRough.gif';
  }
}

function increasePlayerScore() {
  playerScore += 1;
  playerScoreText.innerText = playerScore;
  saveScoreToStorage();
  displayCompleteMessage("You've Won The Battle!");

  if (playerScore == 10) {
    document.getElementById('warImg').src = '/images/winnerWaterTribe.gif';
  }
}

function displayScores() {
  const scoresFromStorage = getScoresFromStorage();

  botScoreText.innerText = scoresFromStorage.botScore;
  playerScoreText.innerText = scoresFromStorage.playerScore;
}

function saveScoreToStorage() {
  const scoresFromStorage = getScoresFromStorage();

  scoresFromStorage['playerScore'] = playerScore;
  scoresFromStorage['botScore'] = botScore;

  localStorage.setItem('scores', JSON.stringify(scoresFromStorage));
}

function getScoresFromStorage() {
  let currentScores;

  if (localStorage.getItem('scores') === null) {
    currentScores = new Object({
      playerScore: 0,
      botScore: 0,
    });
  } else {
    currentScores = JSON.parse(localStorage.getItem('scores'));
  }
  return currentScores;
}

// BENDING TEXT
function playerBend(playerWep) {
  if (playerWep === 'rock') {
    playerActivity.innerText = 'Earth Quake!';
    playerActivity.style.color = 'rgb(9, 245, 28)';
  } else if (playerWep === 'fire') {
    playerActivity.innerText = 'Fire Cyclone!';
    playerActivity.style.color = 'rgb(255,0, 0)';
  } else if (playerWep === 'water') {
    playerActivity.innerText = 'Water Slice!';
    playerActivity.style.color = 'rgb(3, 199, 248)';
  }
}

function botBend(botWep) {
  if (botWep === 'rock') {
    botActivity.innerText = 'Earth Quake!';
    botActivity.style.color = 'rgb(9, 245, 28)';
  } else if (botWep === 'fire') {
    botActivity.innerText = 'Fire Cyclone!';
    botActivity.style.color = 'rgb(255,0, 0)';
  } else if (botWep === 'water') {
    botActivity.innerText = 'Water Slice!';
    botActivity.style.color = 'rgb(3, 199, 248)';
  }
}

// function deleteScore() {}

// GAME MESSAGE
function displayCompleteMessage(msg) {
  document.getElementById('message').innerText = msg;
}

//Reset Board
function resetBoard() {
  const scoresFromStorage = getScoresFromStorage();
  console.log(scoresFromStorage);
  // const scoresFromStorage = getScoresFromStorage();
  // console.log(scoresFromStorage);
  // if (botScore || playerScore !== 0) {
  //   playerScore = 0;
  //   botScore = 0;
  //   playerScore.innerText = 0;
  //   botScore.innerText = 0;
  //   document.getElementById('warImg').src = './images/benderWar.jpg';
  //   systemMsg.forEach((msg) => {
  //     msg.innerText = '';
  //   });
  // }
}

//Event Listeners
reset.addEventListener('click', resetBoard);

document.addEventListener('DOMContentLoaded', displayScores);
