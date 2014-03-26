'use strict';

var
  path = require('path'),
  assert = require('assert');

var
  basePath = process.cwd(),
  equal = assert.equal;

var
  Sequence = require(path.resolve(basePath+'/lib/types/Sequence')),
  Step = require(path.resolve(basePath+'/lib/types/Step')),
  Helper = require(path.resolve(basePath+'/lib/helpers/Helper'));

var
  getNextStep = Helper.getNextStep;

module.exports = function () {
  describe('Helper', function () {
    var
      sequence;

    beforeEach(function () {
      sequence = new Sequence();

      sequence
        .step('a', 'b')
        .control()
          .branch()
            .step('c', 'd')
          .end()
        .end()
        .control()
          .branch()
            .step('e', 'f')
            .step('g', 'h')
          .end()
        .end()
        .control()
          .branch()
            .step('i', 'j')
          .end()
          .branch()
            .step('k', 'l')
          .end()
        .end()
        .control()
          .branch()
            .control()
              .branch()
                .step('m', 'n')
              .end()
            .end()
          .end()
          .branch()
            .control()
              .branch()
                .control()
                  .branch()
                    .step('o', 'p')
                  .end()
                .end()
              .end()
            .end()
          .end()
        .end()
        .step('q', 'r');
    });

    it('.getNextStep', function () {
      var
        step;

      step = getNextStep(sequence);
      equal(step instanceof Step, true);
      equal(step.trigger, 'a');
      equal(step.response, 'b');

      step = getNextStep(step);
      equal(step instanceof Step, true);
      equal(step.trigger, 'c');
      equal(step.response, 'd');

      step = getNextStep(step);
      equal(step instanceof Step, true);
      equal(step.trigger, 'e');
      equal(step.response, 'f');

      step = getNextStep(step);
      equal(step instanceof Step, true);
      equal(step.trigger, 'g');
      equal(step.response, 'h');

      step = getNextStep(step);
      equal(step instanceof Step, true);
      equal(step.trigger, 'i');
      equal(step.response, 'j');

      step = getNextStep(step);
      equal(step instanceof Step, true);
      equal(step.trigger, 'm');
      equal(step.response, 'n');

      step = getNextStep(step);
      equal(step instanceof Step, true);
      equal(step.trigger, 'q');
      equal(step.response, 'r');
    });
  });
};
