const playerActivity = document.querySelector('#playerActivity');
const botActivity = document.querySelector('#botActivity');
const reset = document.getElementById('reset');
const systemMsg = document.querySelectorAll('.msg');

//VARIABLES
const scoresFromStorage = getScoresFromStorage();
let botScoreText = document.getElementById('botScore');
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

function checkWhoWon(botsWeapon, playersWeapon) {
  if (playerScore !== 10 && botScore !== 10) {
    if (botsWeapon == playersWeapon) {
      displayGameMessage('Both Sides Retreated!');
      saveScoreToStorage();
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
  displayGameMessage('You Were Defeated!');
  saveScoreToStorage();

  if (botScore == 10) {
    document.getElementById('warImg').src = '/images/thatsRough.gif';
  }
}

function increasePlayerScore() {
  playerScore += 1;
  playerScoreText.innerText = playerScore;
  displayGameMessage('You Won The Battle!');
  saveScoreToStorage();

  if (playerScore == 10) {
    document.getElementById('warImg').src = '/images/winnerWaterTribe.gif';
  }
}

// GAME MESSAGE
function displayGameMessage(msg) {
  message = document.getElementById('message').innerText = msg;
  saveScoreToStorage();
}

function displayScores() {
  const scoresFromStorage = getScoresFromStorage();

  botScoreText.innerText = scoresFromStorage.botScore;
  playerScoreText.innerText = scoresFromStorage.playerScore;
  document.getElementById('message').innerText = scoresFromStorage.msg;
}

function getScoresFromStorage() {
  let currentScores;

  if (localStorage.getItem('scores') === null) {
    currentScores = new Object({
      playerScore: 0,
      botScore: 0,
      msg: '',
    });
  } else {
    currentScores = JSON.parse(localStorage.getItem('scores'));
  }
  return currentScores;
}

function saveScoreToStorage() {
  const scoresFromStorage = getScoresFromStorage();
  console.log(scoresFromStorage.msg);

  scoresFromStorage['playerScore'] = playerScore;
  scoresFromStorage['botScore'] = botScore;
  scoresFromStorage['msg'] = message;

  localStorage.setItem('scores', JSON.stringify(scoresFromStorage));
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

//Reset Board
function resetBoard() {
  localStorage.clear();
  playerScoreText.innerText = 0;
  botScoreText.innerText = 0;

  playerScore = 0;
  botScore = 0;

  systemMsg.forEach((msg) => {
    msg.innerText = '';
  });

  document.getElementById('warImg').src = '/images/benderWar.jpg';
}

//Event Listeners
reset.addEventListener('click', resetBoard);

document.addEventListener('DOMContentLoaded', displayScores);
document.getElementById('rock').onclick = playerThrowsRock;
document.getElementById('water').onclick = playerThrowsWater;
document.getElementById('fire').onclick = playerThrowsFire;
