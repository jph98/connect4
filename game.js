#!/usr/bin/env node

var Board = require('./board');
var Player = require('./player');
var Colors = require('colors');

// Main game loop
var height = 10;
var width = 10;
var board = new Board(height, width);
board.initialise();

var playerOne = new Player(1, "X");
var playerTwo = new Player(2, "O");
var currentPlayer = playerOne;
var gameOver = false;
var turnTaken = false;

function getColumnFromPlayer() {

	var readlineSync = require('readline-sync');
	return readlineSync.question('Column number:');
}

function validate(column, maximum) {

	if (column > 0 && column < maximum) {
		return true;
	}
	return false;
}

function changePlayer(currentPlayer) {

	if (currentPlayer.getNumber() === 1) {
		return 2;
	} else {
		return 1;
	}
}

// Main game loop
while (!gameOver) {

	while (!turnTaken) {

		var column = getColumnFromPlayer();
		var valid = validate(column, width);

		if (valid) {

			var symbol = currentPlayer.getSymbol();
			console.log("Placing " + symbol + " at " + column);
			var rowColIndex = board.placeCounter(column, symbol);

			if (rowColIndex !== undefined) {

				if (board.gameOverStateReached(rowColIndex[0], rowColIndex[1], symbol)) {
					turnTaken = true;
					gameOver = true;
				} else {

					turnTaken = true;
					board.showGrid();
					var number = changePlayer(currentPlayer);

					if (number === 1) {
						currentPlayer = playerOne;
					} else {
						currentPlayer = playerTwo;
					}
					var msg = "Player " + currentPlayer.getNumber() + " take your turn."; 
					console.log(msg.rainbow);	
				}
			}

		} else {
			console.log("Column invalid, please choose again");
		}
	}
	turnTaken = false;
}