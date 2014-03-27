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
    isMatch,
    step = Helper.getNextStep(this.sequence),
    lastResponse;

  stream.on('end', function () {
    callback();
  });

  stream.on('data', function (chunk) {

    buffer += chunk.toString();

    // if last trigger matched the stream
    if (isMatch && lastResponse) {
      // strip `lastResponse` from buffer
      if (buffer.indexOf(lastResponse) === -1) { return; }

      isMatch = null;
      buffer = '';
    }

    if ( ! step) {
      return;
    }

    isMatch = Helper.isMatch(buffer, step.trigger);

    if (isMatch) {
      lastResponse = step.response+'\r';
      stream.write(lastResponse);

      buffer = '';
      step = Helper.getNextStep(step);
    } else {
      step = Helper.cycleBranchStep(step);
    }
  });

  return true;
};

module.exports = StreamResponder;
