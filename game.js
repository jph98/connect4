#!/usr/bin/env node

var Board = require('./board');

console.log("Board...");
var board = new Board(10, 10);
board.initialise();
board.show_grid();