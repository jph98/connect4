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
      expect(board.getCounter(10,5)).to.equal("X");

      board.placeCounter(5, "X");
      board.displayGridLocations();
      expect(board.getCounter(9,5)).to.equal("X");

      expect(board.getCounter(8,5)).to.equal("|");
      
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
      
      checkGameOverState(board, row, 8, "X");
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
      
      checkGameOverState(board, row, 8, "X");
    });
  });

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
      
      checkGameOverState(board, 7, col, "X");
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

	  checkGameOverState(board, 10, col, "X");        

    });
  });

  describe("check diag upper right", function() {

    it("should check rows and return match", function() {

      var board = new Board(10, 10);
      board.initialise();

      // We have to do this in reverse in terms of the check
      placeCheckDiagUpperRightIndexes(board, 10, 8, "X", false);
      placeCheckDiagUpperRightIndexes(board, 9, 8, "O", false);
      placeCheckDiagUpperRightIndexes(board, 8, 8, "X", false);
      placeCheckDiagUpperRightIndexes(board, 7, 8, "X", false);                

      placeCheckDiagUpperRightIndexes(board, 10, 7, "X", false);
      placeCheckDiagUpperRightIndexes(board, 9, 7, "O", false);
      placeCheckDiagUpperRightIndexes(board, 8, 7, "X", false);

      placeCheckDiagUpperRightIndexes(board, 10, 6, "O", false);
      placeCheckDiagUpperRightIndexes(board, 9, 6, "X", false);

      placeCheckDiagUpperRightIndexes(board, 10, 5, "X", true);
      
      board.showGrid();

      checkGameOverState(board, 10, 5, "X");  
    });
  });

  describe("check diag upper left", function() {

    it("should check rows and return match", function() {

      var board = new Board(10, 10);
      board.initialise();

      // We have to do this in reverse in terms of the check
      placeCheckDiagUpperLeftIndexes(board, 10, 5, "X", false);
      placeCheckDiagUpperLeftIndexes(board, 9, 5, "O", false);
      placeCheckDiagUpperLeftIndexes(board, 8, 5, "X", false);
      placeCheckDiagUpperLeftIndexes(board, 7, 5, "X", false);                

      placeCheckDiagUpperLeftIndexes(board, 10, 6, "X", false);
      placeCheckDiagUpperLeftIndexes(board, 9, 6, "O", false);
      placeCheckDiagUpperLeftIndexes(board, 8, 6, "X", false);    

      placeCheckDiagUpperLeftIndexes(board, 10, 7, "O", false);
      placeCheckDiagUpperLeftIndexes(board, 9, 7, "X", false);

      placeCheckDiagUpperLeftIndexes(board, 10, 8, "X", true);

      board.showGrid();

	  checkGameOverState(board, 10, 8, "X");  

    });
  });

  describe("check diag lower left", function() {

    it("should check rows and return match", function() {

	    var board = new Board(10, 10);
	    board.initialise();

	    placeCheckDiagLowerLeftIndexes(board, 10, 2, "X", false);

		placeCheckDiagLowerLeftIndexes(board, 10, 3, "O", false);
	    placeCheckDiagLowerLeftIndexes(board, 9, 3, "X", false);    

	    placeCheckDiagLowerLeftIndexes(board, 10, 4, "X", false);
	    placeCheckDiagLowerLeftIndexes(board, 9, 4, "O", false);
	    placeCheckDiagLowerLeftIndexes(board, 8, 4, "X", false);    

	    // We have to do this in reverse in terms of the check
	    placeCheckDiagLowerLeftIndexes(board, 10, 5, "X", false);
	    placeCheckDiagLowerLeftIndexes(board, 9, 5, "O", false);
	    placeCheckDiagLowerLeftIndexes(board, 8, 5, "X", false);
	    placeCheckDiagLowerLeftIndexes(board, 7, 5, "X", true);                

	    board.showGrid();

	    checkGameOverState(board, 7, 5, "X");

    });
  });

  describe("check diag lower right", function() {

    it("should check rows and return match", function() {

	    var board = new Board(10, 10);
	    board.initialise();

	    // We have to do this in reverse in terms of the check
	    placeCheckDiagLowerRightIndexes(board, 10, 7, "X", false);

		placeCheckDiagLowerRightIndexes(board, 10, 6, "O", false);
	    placeCheckDiagLowerRightIndexes(board, 9, 6, "X", false);    

	    placeCheckDiagLowerRightIndexes(board, 10, 5, "X", false);
	    placeCheckDiagLowerRightIndexes(board, 9, 5, "O", false);
	    placeCheckDiagLowerRightIndexes(board, 8, 5, "X", false);    

	    // We have to do this in reverse in terms of the check
	    placeCheckDiagLowerRightIndexes(board, 10, 4, "X", false);
	    placeCheckDiagLowerRightIndexes(board, 9, 4, "O", false);
	    placeCheckDiagLowerRightIndexes(board, 8, 4, "X", false);
	    placeCheckDiagLowerRightIndexes(board, 7, 4, "X", true);  

	    board.showGrid();

	    // Check indexes for game over state
	    checkGameOverState(board, 7, 4, "X");

    });
  });

  function placeCheckDiagUpperRightIndexes(board, row, col, symbol, endGameReached) {
  	
  	var rowColIndexes = board.placeCounter(col, symbol);
    expect(board.getCounter(row, col)).to.equal(symbol);
    expect(board.checkDiagUpperRightIndexes(row - 1, col - 1, symbol)).to.equal(endGameReached);
  };

  function placeCheckDiagUpperLeftIndexes(board, row, col, symbol, endGameReached) {
    
    var rowColIndexes = board.placeCounter(col, symbol);
    expect(board.getCounter(row, col)).to.equal(symbol);
    expect(board.checkDiagUpperLeftIndexes(row - 1, col - 1, symbol)).to.equal(endGameReached);
  };

  function placeCheckDiagLowerLeftIndexes(board, row, col, symbol, endGameReached) {
    
    var rowColIndexes = board.placeCounter(col, symbol);
    expect(board.getCounter(row, col)).to.equal(symbol);
    expect(board.checkDiagLowerLeftIndexes(row - 1, col - 1, symbol)).to.equal(endGameReached);
  };

  function placeCheckDiagLowerRightIndexes(board, row, col, symbol, endGameReached) {
    
    var rowColIndexes = board.placeCounter(col, symbol);
    expect(board.getCounter(row, col)).to.equal(symbol);
    expect(board.checkDiagLowerRightIndexes(row - 1, col - 1, symbol)).to.equal(endGameReached);
  };

  function placeCheckCol(board, row, col, expected) {

  	var rowColIndexes = board.placeCounter(col, "X");
    expect(board.getCounter(row, col)).to.equal("X");
    expect(board.checkLeftIndexes(row - 1, col - 1, "X")).to.equal(expected);
  };

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

  function checkGameOverState(board, row, col, symbol) {

  	expect(board.gameOverStateReached(row - 1, col -1, symbol)).to.equal(true);
  };
 
});