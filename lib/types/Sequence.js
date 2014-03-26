'use strict';

var
  Step = require('./Step'),
  Iterator = require('./Iterator');

function Sequence() {
  this.parent = null;
  this.statements = []; // contains instances of types `Step` or `Control`
  this.iterator = new Iterator(this.statements);
}

Sequence.prototype.step = function (trigger, response) {
  var
    step = new Step(trigger, response);

  step.parent = this;
  step.index = this.statements.length;
  this.statements.push(step);
  return this;
};

Sequence.prototype.control = function () {
  var
    Control = require('./Control');

  var
    control = new Control();

  control.parent = this;
  this.statements.push(control);

  return control;
};

Sequence.prototype.end = function () {
  if (this.statements.length === 0) {
    throw new Error('A sequence can\'t be empty');
  }
  return this.parent;
};

module.exports = Sequence;
