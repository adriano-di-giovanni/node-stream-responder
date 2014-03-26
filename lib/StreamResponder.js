'use strict';

var
  Sequence = require('./types/Sequence'),
  Helper = require('./helpers/Helper');

function StreamResponder() {
  this.sequence = new Sequence();
}

StreamResponder.prototype.monitor = function (stream) {

  // can't monitor stream if sequence is empty
  if ( ! this.sequence.iterator.hasNext()) { return false; }

  var
    buffer = '',
    isMatch = false,
    step = Helper.getNextStep(this.sequence);

  stream.on('data', function (chunk) {
    buffer += chunk.toString();

    if ( ! step) {
      return;
    }

    if (isMatch) {
      // strip previous response from buffer
      if (buffer.indexOf(step.response) === -1) { return; }
      buffer = '';
    }

    isMatch = Helper.isMatch(buffer, step.trigger);

    if (isMatch) {
      buffer = '';
      stream.write(step.response+'\n');
      step = Helper.getNextStep(step);
    } else {
      step = Helper.cycleBranchStep(step);
    }
  });

  return true;
};

module.exports = StreamResponder;
