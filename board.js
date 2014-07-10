#!/usr/bin/env node

// See - http://www.hacksparrow.com/node-js-exports-vs-module-exports.html
var _ = require('underscore');

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
				this.grid[y][x] = "E";			
			}
		}
	};

	this.get_grid = function() {
		return this.grid;
	};

	this.show_grid = function () {	

		for (var y = 0; y < height; y++) {	
			
			var display = ""
			for (var x = 0; x < width; x++) {
				display += this.grid[y][x] + " "
			}
			var row_num = y + 1;
			console.log(row_num + ":" + this.get_spaces(row_num, width) + display);
		}
	};

	this.get_spaces = function(row_num, width) {
		
		var numspaces = (width.toString().length - row_num.toString().length) + 1;
		var padding = "";
		for (var n = 0; n < numspaces; n++) {
			padding += " "
		}
		return padding;
	}
};