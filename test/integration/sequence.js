'use strict';

var
  path = require('path'),
  assert = require('assert');

var
  _ = require('underscore');

var
  basePath = process.cwd(),
  equal = assert.equal;

var
  Control = require(path.resolve(basePath+'/lib/types/Control')),
  Sequence = require(path.resolve(basePath+'/lib/types/Sequence')),
  Step = require(path.resolve(basePath+'/lib/types/Step'));

module.exports = function () {
  describe('integration', function () {
    var
      sequence;

    beforeEach(function () {
      sequence = new Sequence();
    });

    it('add steps', function () {
      var
        result = sequence
          .step('a', 'b')
          .step('c', 'd')
          .step('e', 'f');

      equal(result, sequence);
      equal(sequence.statements.length, 3);

      _.each(sequence.statements, function (child, index) {
        equal(child instanceof Step, true);
        switch (index) {
          case 0:
            equal(child.trigger, 'a');
            equal(child.response, 'b');
            break;
          case 1:
            equal(child.trigger, 'c');
            equal(child.response, 'd');
            break;
          case 2:
            equal(child.trigger, 'e');
            equal(child.response, 'f');
            break;
        }
      });
    });

    it.skip('add control without end', function () {
      var
        result = sequence
          .control();

        equal(result instanceof Control, true);
        equal(result.parent, sequence);
    });

    it.skip('add control with no branches', function () {
      var
        control = sequence
          .control(),
        result = control
          .end();

        equal(result, sequence);
        equal(sequence.statements[0], control);
    });

    it.skip('add branch without end', function () {
      var
        control = sequence
          .control(),
        result = control
            .branch();

        equal(result instanceof Sequence, true);
        equal(result.parent, control);
    });

    it('add control with branches', function () {
      var
        result = sequence
          .control()
            .branch()
              .step('a', 'b')
              .step('c', 'd')
            .end()
            .branch()
              .step('e', 'f')
            .end()
          .end()
          .step()
          .step(),

        control = sequence.statements[0],
        branch0 = control.branches[0],
        branch1 = control.branches[1];

        equal(result, sequence);
        equal(control instanceof Control, true);
        equal(branch0 instanceof Sequence, true);
        equal(branch1 instanceof Sequence, true);
    });
  });
};
