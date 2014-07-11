#!/usr/bin/env node

var Board = require('./board');
var Player = require('./player');
var readline = require('readline-sync');

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

function placeCounter(column, symbol) {

	console.log("Placing " + symbol + " at " + column);

	if (board.placeCounter(column, symbol)) {
		return true;
	} else {
		return false;
	}
}

function changePlayer(currentPlayer) {

	if (currentPlayer.getNumber() == 1) {
		return 2;
	} else {
		return 1;
	}
}

function gameOver() {

	console.log("Checking for game over state");

	// 
	return false;
}

// Main game loop
var height = 10;
var width = 10;
var gameOver = false;
var playerNumberTurn = 1;

var board = new Board(height, width);
board.initialise();

var playerOne = new Player(1, "X");
var playerTwo = new Player(2, "O");
var currentPlayer = playerOne;

// TODO: Loop and switch players
var turnTaken = false;

while (!gameOver) {

	while (!turnTaken) {

		column = getColumnFromPlayer();
		var valid = validate(column, width);

		if (valid) {

			if (placeCounter(column, currentPlayer.getSymbol())) {

				turnTaken = true;
				board.showGrid();
				var number = changePlayer(currentPlayer);

				if (number == 1) {
					currentPlayer = playerOne;
				} else {
					currentPlayer = playerTwo;
				}
				console.log("Changed player to " + currentPlayer.getNumber());
			}

		} else {
			console.log("Column invalid, please choose again");
		}
	}
	turnTaken = false;
}