'use strict';

function Step(trigger, response) {
  this.parent = null;
  this.trigger = trigger;
  this.response = response;
  this.index = -1; // sequence index
}

module.exports = Step;
