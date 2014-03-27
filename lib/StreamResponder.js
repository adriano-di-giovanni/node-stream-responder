'use strict';

var
  Sequence = require('./types/Sequence'),
  Helper = require('./helpers/Helper');

function StreamResponder() {
  this.sequence = new Sequence();
}

StreamResponder.prototype.observe = function (stream, callback) {

  // can't monitor stream if sequence is empty
  if ( ! this.sequence.iterator.hasNext()) { return false; }

  var
    buffer = '',
    isMatch = false,
    step = Helper.getNextStep(this.sequence),
    lastResponse;

  stream.on('data', function (chunk) {

    buffer += chunk.toString();

    if ( ! step) {
      return callback();
    }

    if (isMatch && lastResponse) {
      // strip previous response from buffer
      if (buffer.indexOf(lastResponse) === -1) { return; }
      buffer = '';
    }

    isMatch = Helper.isMatch(buffer, step.trigger);

    if (isMatch) {
      stream.write(step.response+'\n');

      buffer = '';
      lastResponse = step.response;
      step = Helper.getNextStep(step);
    } else {
      step = Helper.cycleBranchStep(step);
    }
  });

  return true;
};

module.exports = StreamResponder;
