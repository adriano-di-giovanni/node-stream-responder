'use strict';

var
  Iterator = require('./Iterator');

function Control() {
  this.parent = null;
  this.branches = [];
  this.iterator = new Iterator(this.branches);
}

Control.prototype.branch = function () {
  var
    Sequence = require('./Sequence');

  var
    branch = new Sequence();

  branch.parent = this;
  this.branches.push(branch);

  return branch;
};

Control.prototype.end = function () {
  if (this.branches.length === 0) {
    throw new Error('A control can\'t be empty');
  }
  return this.parent;
};

module.exports = Control;
