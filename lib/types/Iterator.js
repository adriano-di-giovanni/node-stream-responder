'use strict';

function Iterator(array) {
  this.reset();
  this.array = array;
}

Iterator.prototype.first = function () {
  this.reset();
  return this.next();
};

Iterator.prototype.last = function () {
  this.index = this.array.length - 1;
  return this.array[this.index];
};

Iterator.prototype.previous = function () {
  this.index -= 1;
  return this.array[this.index];
};

Iterator.prototype.next = function () {
  this.index += 1;
  return this.array[this.index];
};

Iterator.prototype.hasPrevious = function () {
  return this.array.length > 0 && this.index > 0;
};

Iterator.prototype.hasNext = function () {
  return this.array.length > 0 && this.index < (this.array.length - 1);
};

Iterator.prototype.reset = function () {
  this.index = -1;
};

module.exports = Iterator;
