'use strict';

describe('Unit tests', function () {
  var
    base = require('./base'),
    integration = require('./integration');

  base.Iterator();
  base.Helper();

  integration.sequence();
});
