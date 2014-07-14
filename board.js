#!/usr/bin/env node
//'use strict';
// See - http://www.hacksparrow.com/node-js-exports-vs-module-exports.html
var _ = require('underscore');

EMPTY = "|";
RIGHT = "right";
LEFT = "left";

module.exports = function (height, width) {

	this.height = height;
	this.width = width;
	this.grid = new Array(height);

	// Draw rows top to bottom
	this.initialise = function() {
		for (var y = 0; y < height; y++) {

			this.grid[y] = new Array(width);

			// Draw columns
			for (var x = 0; x < width; x++) {			
				this.grid[y][x] = EMPTY;
			}
		}
	};

	this.getGrid = function() {
		return this.grid;
	};

	this.showHeader = function() {

		var header = "";
		for (var x = 0; x < width; x++) {
			header += (x + 1) + " ";
		}
		console.log(this.getSpaces(width.toString().length * 2) + header);
	};

	this.showGrid = function () {	

		this.showHeader();

		for (var y = 0; y < height; y++) {	
			
			var display = "";
			for (var x = 0; x < width; x++) {
				display += this.grid[y][x] + " ";
			}
			var row_num = y + 1;
			console.log(row_num + ":" + this.getSpacesForRowNumber(row_num, width) + display);
		}
	};

	this.getSpacesForRowNumber = function(row_num, width) {
		
		var numspaces = (width.toString().length - row_num.toString().length) + 1;
		return this.getSpaces(numspaces);
	};

	this.getSpaces = function(numspaces) {

		var padding = "";
		for (var n = 0; n < numspaces; n++) {
			padding += " ";
		}
		return padding;
	};

	this.findNextVerticalSlot = function(colIndex) {

		var rowIndex = (height - 1);
		for (var row = rowIndex; row >= 0; row--) {

			var state = this.grid[row][colIndex];
			console.log("State " + state + " for row: " + row + ", colindex: " + colIndex);
			if (state === EMPTY) {
				return row;
			} 
		}
		return -1;
	};

	this.placeCounter = function(column, counter) {

		var colIndex = column - 1;
		var row = this.findNextVerticalSlot(colIndex);
		if (row != -1) {
			console.log("Placed at row: " + row + " column: " + column);
			this.grid[row][colIndex] = counter;	
			return [row, colIndex];
		} else {
			console.log("You cannot place a counter here, we're full");
			return undefined;
		}
	};

	this.displayGridLocations = function(row, column) {

		for (var y = 0; y < height; y++) {	
			
			var display = "";
			for (var x = 0; x < width; x++) {
				display += x + "[" + this.grid[y][x] + "] ";
			}
			var row_num = y + 1;
			console.log(y + " " + display);
		}
	};

	this.getCounter = function(row, column) {

		var rowIndex = row - 1;
		var colIndex = column - 1;
		console.log("Retrieving rowIndex: " + rowIndex  + " colIndex: " + colIndex);
		return this.grid[rowIndex][colIndex];
	};

	this.checkCounters = function(row, col, symbol, count) {

		var counter = this.grid[row][col];
		if (counter === symbol) {
			count += 1;
		} else {
			count = 0;	
		} 
		console.log("Counter: " + counter + " symbol: " + symbol + " count: [" + count + "]");
		return count;
	};

	this.checkLeftIndexes = function(rowIndex, colIndex, symbol) {

		console.log("\n\nCheck columns LEFT\n\n");
		var count = 0;
		var maxCol = colIndex - 4;
		if (maxCol >= 0) {

			for (var col = colIndex; col > maxCol; col--) {

				console.log("col: " + col + " max: " + maxCol);
				count = this.checkCounters(rowIndex, col, symbol, count);
			}
		}
		console.log("Final count " + count);

		return count === 4;
	};

	this.checkRightIndexes = function(rowIndex, colIndex, symbol) {

		console.log("\n\nCheck columns RIGHT\n\n");
		var count = 0;
		var maxCol = colIndex + 4;
		if (maxCol <= width) {

			for (var col = colIndex; col < maxCol; col++) {

				console.log("col: " + col + " max: " + maxCol);
				count = this.checkCounters(rowIndex, col, symbol, count);
			}
		}

		return count === 4;
	};

	this.checkUpIndexes = function(rowIndex, colIndex, symbol) {

		console.log("\n\nCheck rows UP\n\n" + rowIndex);
		var count = 0;
		var maxRow = rowIndex - 4;

		if (maxRow >= 0) {

			for (var row = rowIndex; row > maxRow; row--) {

				console.log("Row: " + row + " max: " + maxRow);
				count = this.checkCounters(row, colIndex, symbol, count);
			}
		}

		return count === 4;
	};

	this.checkDownIndexes = function(rowIndex, colIndex, symbol) {

		console.log("\n\nCheck rows DOWN\n\n");
		var count = 0;
		var maxRow = rowIndex + 4;
		if (maxRow <= height) {

			for (var row = rowIndex; row < maxRow; row++) {

				console.log("Up Row: " + row + " max: " + maxRow);
				count = this.checkCounters(row, colIndex, symbol, count);
			}
		}

		return count === 4;
	};

	this.checkDiagUpperRightIndexes = function(rowIndex, colIndex, symbol) {

		console.log("\n\nCheck UPPER RIGHT DIAG\n\n");
		var count = 0;
		var maxRow = rowIndex - 4;
		var maxCol = colIndex + 4;

		console.log("Row index: " + rowIndex + " colIndex: " + colIndex + " maxRow: " + maxRow + " maxCol: " + maxCol);
		if (maxRow >= 0 && maxCol <= width) {

			while (rowIndex > maxRow && colIndex < maxCol) {

				count = this.checkCounters(rowIndex, colIndex, symbol, count);
				rowIndex -= 1;
				colIndex += 1;
			}
		}

		return count === 4;
	};

	this.checkDiagUpperLeftIndexes = function(rowIndex, colIndex, symbol) {

		console.log("\n\nCheck UPPER LEFT DIAG\n\n");
		var count = 0;
		var maxRow = rowIndex - 4;
		var maxCol = colIndex - 4;

		console.log("Row index: " + rowIndex + " colIndex: " + colIndex + " maxRow: " + maxRow + " maxCol: " + maxCol);
		if (maxRow >= 0 && maxCol >= 0) {

			while (rowIndex > maxRow && colIndex > maxCol) {

				count = this.checkCounters(rowIndex, colIndex, symbol, count);
				rowIndex -= 1;
				colIndex -= 1;
			}
		}

		return count === 4;
	};

	this.checkDiagLowerLeftIndexes = function(rowIndex, colIndex, symbol) {

		// TODO
	};

	this.checkDiagLowerRightIndexes = function(rowIndex, colIndex, symbol) {
	};

	this.gameOverStateReached = function(rowIndex, colIndex, symbol) {

		console.log("Checking for game over state using " + rowIndex + " " + colIndex);

		// Columns
		// if (this.checkLeftIndexes(rowIndex, colIndex, symbol)) {
		// 	console.log("Cols RIGHT: WIN");
		// } else if (this.checkRightIndexes(rowIndex, colIndex, symbol)) {
		// 	console.log("Cols LEFT: WIN");
		// }

		// // Rows
		// if (this.checkDownIndexes(rowIndex, colIndex, symbol)) {
		// 	console.log("Row DOWN: WIN");
		// } else if (this.checkUpIndexes(rowIndex, colIndex, symbol)) {
		// 	console.log("Row UP: WIN");
		// }

		// // Diagonals
		// if (this.checkDiagUpperRightIndexes(rowIndex, colIndex, symbol)) {
		// 	console.log("Diag Upper Right: WIN");
		// } else if (this.checkDiagUpperLeftIndexes(rowIndex, colIndex, symbol)) {
		//  console.log("Diag Upper Left: WIN");
		// } else if (this.checkDiagLowerLeftIndexes(rowIndex, colIndex, symbol)) {
		//  console.log("Diag Lower Left: WIN");
		// } else if (this.checkDiagLowerRightIndexes(rowIndex, colIndex, symbol)) {
		//  console.log("Diag Lower Right: WIN");
		// }

		return false;
	};
};