#!/usr/bin/env node

var Board = require('./board');
var Player = require('./player');
var Colors = require('colors');
var Chalk = require('chalk');

var DEBUG = false;

// Main game loop
var height = 6;
var width = 8;
var board = new Board(height, width);
board.initialise();

var playerOne = new Player(1, "X");
var playerTwo = new Player(2, "O");
var currentPlayer = playerOne;
var gameOver = false;
var turnTaken = false;

getColumnFromPlayer = function getColumnFromPlayer() {

	var readlineSync = require('readline-sync');
	board.showGrid();

	var msg = "\nPlayer " + currentPlayer.getNumber() + " turn: "; 
	return readlineSync.question(msg.green);
}

getCurrentPlayer = function getCurrentPlayer() {
	return currentPlayer;
}

getBoard = function getBoard() {
	return board;
}

validate = function validate(column, maximum) {

	if (column > 0 && column <= maximum) {
		return true;
	}
	return false;
}

changePlayer = function changePlayer(currentPlayer) {

	if (currentPlayer.getNumber() === 1) {
		DEBUG && console.log("Changed player to 2");
		return 2;
	} else {
		DEBUG && console.log("Changed player to 2");
		return 1;
	}
}

switchPlayer = function swapPlayers(current) {
	var number = changePlayer(current);
	if (number === 1) {
		console.log("Changed player to 1");
		currentPlayer = playerOne;
		console.log("Now current " + currentPlayer.getNumber());
	} else {
		console.log("Changed player to 2");
		currentPlayer = playerTwo;
		console.log("Now current " + currentPlayer.getNumber());
	}
}

var main = function(){

	// Main game loop: pull out output logic
	var gameMsg = "\nConnect 4\n";
	console.log(gameMsg.rainbow.underline);

	while (!gameOver) {

		while (!turnTaken) {

			var column = getColumnFromPlayer();
			var valid = validate(column, width);

			if (valid) {

				var symbol = currentPlayer.getSymbol();
				DEBUG && console.log("Placing " + symbol + " at " + column);
				var rowColIndex = board.placeCounter(column, symbol);

				if (rowColIndex !== undefined) {

					if (board.gameOverStateReached(rowColIndex[0], rowColIndex[1], symbol)) {
						turnTaken = true;
						gameOver = true;

						board.showGrid();
						var msg = "\nGame Over! Player " + currentPlayer.getNumber() + " WINS!\n";
						console.log(msg.yellow);	

					} else {

						turnTaken = true;
						//board.showGrid();z
						var number = changePlayer(currentPlayer);

						if (number === 1) {
							currentPlayer = playerOne;
						} else {
							currentPlayer = playerTwo;
						}
						var msg = "\nPlayer " + currentPlayer.getNumber() + " take your turn."; 
						console.log(msg.green);	
					}
				}

			} else {
				console.log("Column invalid, please choose again");
			}
		}
		turnTaken = false;
	}
}

if (require.main === module) {
    main();
}
