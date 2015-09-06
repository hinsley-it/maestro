var assert = require('assert');

suite('Maestro', function () {
    test('"Hello" should not equal "world"', function (done) {
        assert.notEqual('Hello', 'world');

        done();
    });
});

