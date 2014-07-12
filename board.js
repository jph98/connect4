#!/usr/bin/env node

// See - http://www.hacksparrow.com/node-js-exports-vs-module-exports.html
var _ = require('underscore');

EMPTY = "|";

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
			if (state == EMPTY) {
				return row;
			} 
		}
		return -1;
	};

	this.placeCounter = function(column, counter) {

		var colIndex = column - 1;
		var row = this.findNextVerticalSlot(colIndex);
		if (row != -1) {
			this.grid[row][colIndex] = counter;	
			return true;
		} else {
			console.log("You cannot place a counter here, we're full");
			return false;
		}
		
	};
};