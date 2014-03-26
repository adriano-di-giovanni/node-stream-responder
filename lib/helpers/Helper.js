'use strict';

var
  S = require('string');

var
  Sequence = require('../types/Sequence'),
  Step = require('../types/Step'),
  Control = require('../types/Control');

exports.getNextStep = function (statement) {
  var
    s = statement;

  while (s && ! ((s instanceof Sequence) && s.iterator.hasNext())) {
    s = s.parent;
  }

  // no more steps
  if ( ! s) { return void 0; }

  s = s.iterator.next();

  // while statement is not of type `Step`
  // move to first statement of the first branch of a control structure
  while (s && ! (s instanceof Step)) {
    s = s.iterator.next();
  }

  return s;
};

exports.cycleBranchStep = function (step) {
  // if step is not the first one in the sequence
  // we don't care if sequence is a control branch
  if (step.index !== 0) { return step; }

  var
    s = step.parent.parent;

  // if step belongs to a control branch
  if (s instanceof Control) {
    // move to next branch or cycle
    s = s.iterator.hasNext() ? s.iterator.next() : s.iterator.first();

    // while statement is not of type `Step`
    // move to first statement of the first branch of a control structure
    while ( ! (s instanceof Step)) {
      s = s.iterator.next();
    }

    return s;
  }

  return step;
};

exports.isMatch = function (buffer, trigger) {
  var
    isMatch;

  if (typeof trigger === 'string') {
    isMatch = S(buffer).endsWith(trigger);
  } else if (trigger instanceof RegExp) {
    isMatch = buffer.match(trigger) !== null;
  }

  return isMatch;
};
