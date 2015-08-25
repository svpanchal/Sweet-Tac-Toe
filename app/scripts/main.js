// jshint devel:true
console.log('Tic Tac Toe!');

//
window.onload = start;
var boxes = document.getElementsByTagName('td');
var turnText = document.querySelector('.playerTurn');
var counter = 1;
var winCounter = 0;
var OMoves = [];
var XMoves = [];

var winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//If this button is clicked, clear all boxes and reset the game.
function resetBoard() {
  'use strict';
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxes[i].innerHTML = '';
    boxes[i].setAttribute('class', 'clear');
  }
  OMoves = [];
  XMoves = [];
  winCounter = 0;
  counter = 1;
  turnText.innerHTML = 'Kick off the game, Player X!';
}

function checkForWin(movesArray, name) {
  'use strict';
  // loop over the first array of winning combinations
  for (i = 0; i < winningCombinations.length; i++) {
    // reset the winCounter each time
    winCounter = 0;
    // loop over each individual array
    for (var j = 0; j < winningCombinations[i].length; j++) {
      // If the number in winning combo array is === a number in moves array, add to winCounter
      if (movesArray.indexOf(winningCombinations[i][j]) !== -1) {
        winCounter++;
      }
      // If winCounter === 3, then all 3 moves comprise a winning combination and game is over and a winner is declared.
      if (winCounter === 3) {
      alert('Congrats Player ' + name + ', you won!');
        resetBoard();
      }
    }
  }
}

function playXorO(event) {
  'use strict';
  if (event.target.innerHTML.length === 0) {
    if (counter % 2 === 0) {
      OMoves.push(parseInt(event.target.getAttribute('data-num')));
      event.target.innerHTML = 'O';
      event.target.setAttribute('class', 'O');
      turnText.innerHTML = 'Your turn, Player X';
      counter++;
      checkForWin(OMoves, 'O');
    }
    else {
      XMoves.push(parseInt(event.target.getAttribute('data-num')));
      event.target.innerHTML = 'X';
      event.target.setAttribute('class', 'X');
      turnText.innerHTML = 'Your move, Player O';
      counter++;
      checkForWin(XMoves, 'X');
    }
    // if the counter is greater than or equal to 10, declare the game a draw.
    if (counter >= 10) {
      turnText.innerHTML = 'Game Over!';
      var conf = confirm('It is a draw, want a rematch?');
      if (conf) {
        resetBoard();
      }
    }
  }
}

//Makes each cell clickable
function playXandOListener() {
  'use strict';
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxes[i].addEventListener('click', playXorO);
  }
}

//Makes 'Reset game' button clickable
function addResetListener() {
  'use strict';
  var resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', resetBoard);
}

function start() {
  'use strict';
  playXandOListener();
  addResetListener();
}
