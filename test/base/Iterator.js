'use strict';

var
  path = require('path'),
  assert = require('assert');

var
  basePath = process.cwd(),
  equal = assert.equal;

var
  Iterator = require(path.resolve(basePath+'/lib/types/Iterator'));

module.exports = function () {
  describe('Iterator', function () {
    var
      array = [ 'a', 'b', 'c' ],
      iterator = new Iterator(array);

    it('#first', function () {
      equal((new Iterator([])).first(), void 0);
      equal(iterator.first(), 'a');
    });

    it('#last', function () {
      equal((new Iterator([])).last(), void 0);
      equal(iterator.last(), 'c');
    });

    it('#previous', function () {

    });

    it('#previous', function () {
      equal((new Iterator([])).previous(), void 0);

      equal(iterator.last(), 'c');
      equal(iterator.previous(), 'b');
      equal(iterator.previous(), 'a');
      equal(iterator.previous(), void 0);
    });

    it('#next', function () {
      equal((new Iterator([])).next(), void 0);

      equal(iterator.first(), 'a');
      equal(iterator.next(), 'b');
      equal(iterator.next(), 'c');
      equal(iterator.next(), void 0);
    });

    it('#hasPrevious', function () {
      equal((new Iterator([])).hasPrevious(), false);

      iterator.reset();
      equal(iterator.hasPrevious(), false);
      iterator.last();
      equal(iterator.hasPrevious(), true);
      iterator.previous();
      equal(iterator.hasPrevious(), true);
      iterator.previous();
      equal(iterator.hasPrevious(), false);

    });

    it('#hasNext', function () {
      equal((new Iterator([])).hasNext(), false);

      iterator.reset();
      equal(iterator.hasNext(), true);
      iterator.first();
      equal(iterator.hasNext(), true);
      iterator.next();
      equal(iterator.hasNext(), true);
      iterator.next();
      equal(iterator.hasNext(), false);

    });
  });
};
