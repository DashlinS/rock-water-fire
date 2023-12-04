/*
To add:
Reset game, reset score
Save current score in LocalStorage
Save moves and fights in LocalStorage
Media Queries
*/
let playerScoreVal = document.getElementById('playerScore');
let botScoreVal = document.getElementById('botScore');
let systemMsg = document.querySelectorAll('.msg');
const reset = document.getElementById('reset');

document.getElementById('rock').onclick = playerThrowsRock;
document.getElementById('water').onclick = playerThrowsWater;
document.getElementById('fire').onclick = playerThrowsFire;

let botScore = +botScoreVal.innerText,
  playerScore = +playerScoreVal.innerText;
// DOM

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
  } else {
    document.querySelector('#playerActivity').innerText = 'GAME';
    document.querySelector('#playerActivity').style.color = 'yellow';
    document.querySelector('#botActivity').innerText = 'OVER';
    document.querySelector('#botActivity').style.color = 'yellow';
  }
}
// INCREASE SCORE
function increaseBotScore() {
  botScore += 1;
  document.getElementById('botScore').innerText = botScore;
  displayCompleteMessage("You've Been Defeated!");

  if (botScore == 10) {
    document.querySelector('#warImg').style.display = 'none';
    document.querySelector('.gifBox').innerHTML =
      "<img src='./images/thatsRough.gif'>";
  }
}
function increasePlayerScore() {
  playerScore += 1;
  document.getElementById('playerScore').innerText = playerScore;
  displayCompleteMessage("You've Won The Battle!");

  if (playerScore == 10) {
    document.querySelector('#warImg').style.display = 'none';
    document.querySelector('.gifBox').innerHTML =
      "<img src='./images/winnerWaterTribe.gif'>";
  }
}

// GAME MESSAGE
function displayCompleteMessage(msg) {
  document.getElementById('message').innerText = msg;
}

// BENDING TEXT
function playerBend(playerWep) {
  if (playerWep === 'rock') {
    document.querySelector('#playerActivity').innerText = 'Earth Quake!';
    document.querySelector('#playerActivity').style.color = 'rgb(9, 245, 28)';
  } else if (playerWep === 'fire') {
    document.querySelector('#playerActivity').innerText = 'Fire Cyclone!';
    document.querySelector('#playerActivity').style.color = 'rgb(255,0, 0)';
  } else if (playerWep === 'water') {
    document.querySelector('#playerActivity').innerText = 'Water Slice!';
    document.querySelector('#playerActivity').style.color = 'rgb(3, 199, 248)';
  }
}

function botBend(botWep) {
  if (botWep === 'rock') {
    document.querySelector('#botActivity').innerText = 'Earth Quake!';
    document.querySelector('#botActivity').style.color = 'rgb(9, 245, 28)';
  } else if (botWep === 'fire') {
    document.querySelector('#botActivity').innerText = 'Fire Cyclone!';
    document.querySelector('#botActivity').style.color = 'rgb(255,0, 0)';
  } else if (botWep === 'water') {
    document.querySelector('#botActivity').innerText = 'Water Slice!';
    document.querySelector('#botActivity').style.color = 'rgb(3, 199, 248)';
  }
}

//Reset Board
function resetBoard() {
  if (botScore || playerScore >= 1) {
    console.log(playerScore, botScore);
    playerScore = 0;
    botScore = 0;
    playerScoreVal.innerText = 0;
    botScoreVal.innerText = 0;

    systemMsg.forEach((msg) => {
      msg.innerText = '';
    });

    window.location.reload();
  }
}

//Event Listeners
reset.addEventListener('click', resetBoard);
