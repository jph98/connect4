#!/usr/bin/env node
//'use strict';
// See - http://www.hacksparrow.com/node-js-exports-vs-module-exports.html
var _ = require('underscore');

module.exports = function(number, symbol) {

	this.number = number;
	this.symbol = symbol;

	this.getNumber = function() {
		return this.number;
	};

	this.getSymbol = function() {
		return this.symbol;
	};
};