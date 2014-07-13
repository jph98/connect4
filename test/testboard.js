#!/usr/bin/env node

// See - http://blog.codeship.io/2014/01/22/testing-frontend-javascript-code-using-mocha-chai-and-sinon.html

var Board = require('../board');
var chai = require('chai');

var expect = chai.expect;
 
describe("Board", function() {

  describe("constructor", function() {

    it("should have correct sizes", function() {

      var board = new Board(10, 10);
      board.initialise();
      expect(board.height).to.equal(10);
      expect(board.width).to.equal(10);

      expect(board.getCounter(1,1)).to.equal("|");
      expect(board.getCounter(10,10)).to.equal("|");
      expect(board.getCounter(1,10)).to.equal("|");
      expect(board.getCounter(10,1)).to.equal("|");

    });
  });

  describe("placecounter", function() {

    it("should place count", function() {

      var board = new Board(10, 10);
      board.initialise();
      board.placeCounter(5, "X");

      board.displayGridLocations();
      expect(board.getCounter(10,5)).to.equal("X");
      
    });
  });

  describe("check columns left", function() {

    it("should check columns and return match", function() {

      var board = new Board(10, 10);
      board.initialise();

      var row = 10;
      placeCheckCol(board, row, 5, false);
      placeCheckCol(board, row, 6, false);
      placeCheckCol(board, row, 7, false);
      placeCheckCol(board, row, 8, true);
      board.showGrid();
      
    });
  });

  describe("check columns right", function() {

    it("should check columns and return match", function() {

      var board = new Board(10, 10);
      board.initialise();

      var row = 10;
      placeCheckCol(board, row, 5, false);
      placeCheckCol(board, row, 6, false);
      placeCheckCol(board, row, 7, false);
      placeCheckCol(board, row, 8, true);
      board.showGrid();
      
    });
  });

  function placeCheckRow(direction, board, row, col, endGameReached) {
  	
  	var rowColIndexes = board.placeCounter(col, "X");
    expect(board.getCounter(row, col)).to.equal("X");
    console.log("direction: " + direction);
    if (direction === "down") {
    	expect(board.checkDownIndexes(row - 1, col - 1, "X")).to.equal(endGameReached);
    } else if (direction === "up") {
    	expect(board.checkUpIndexes(row - 1, col - 1, "X")).to.equal(endGameReached);
    }
  };

  describe("check rows down", function() {

    it("should check rows and return match", function() {

      var board = new Board(10, 10);
      board.initialise();

      var col = 8;
      // We have to do this in a consecutive manner because of the vertical stacking
      placeCheckRow("down", board, 10, col, false);
      placeCheckRow("down", board, 9, col, false);
      placeCheckRow("down", board, 8, col, false);
      placeCheckRow("down", board, 7, col, true);
      board.showGrid();
      
    });
  });

  describe("check rows up", function() {

    it("should check rows and return match", function() {

      var board = new Board(10, 10);
      board.initialise();

      var col = 8;
      placeCheckRow("up", board, 10, col, false);
      placeCheckRow("up", board, 10, col, false);
      placeCheckRow("up", board, 10, col, false);
      placeCheckRow("up", board, 10, col, true);
      
    });
  });

  describe("check diag upper right", function() {

    it("should check rows and return match", function() {

      var board = new Board(10, 10);
      board.initialise();

      placeCheckDiagUpperRightIndexes(board, 10, 5, "X", false);

      placeCheckDiagUpperRightIndexes(board, 10, 6, "O", false);
      placeCheckDiagUpperRightIndexes(board, 9, 6, "X", false);

      placeCheckDiagUpperRightIndexes(board, 10, 7, "X", false);
      placeCheckDiagUpperRightIndexes(board, 9, 7, "O", false);
      placeCheckDiagUpperRightIndexes(board, 8, 7, "X", false);

      placeCheckDiagUpperRightIndexes(board, 10, 8, "X", false);
      placeCheckDiagUpperRightIndexes(board, 9, 8, "O", false);
      placeCheckDiagUpperRightIndexes(board, 8, 8, "X", false);
      placeCheckDiagUpperRightIndexes(board, 7, 8, "X", false);
      
      board.showGrid();

      placeCheckDiagUpperRightIndexes(board, 10, 5, "X", true);

    });
  });

   function placeCheckDiagUpperRightIndexes(board, row, col, symbol, endGameReached) {
  	
  	var rowColIndexes = board.placeCounter(col, symbol);
    expect(board.getCounter(row, col)).to.equal(symbol);
    expect(board.checkDiagUpperRightIndexes(row - 1, col - 1, symbol)).to.equal(endGameReached);
  };

  function placeCheckCol(board, row, col, expected) {

  	var rowColIndexes = board.placeCounter(col, "X");
    expect(board.getCounter(row, col)).to.equal("X");
    expect(board.checkLeftIndexes(row - 1, col - 1, "X")).to.equal(expected);
  };


  
 
});