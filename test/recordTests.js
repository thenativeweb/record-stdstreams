'use strict';

var assert = require('assertthat');

var record = require('../lib/record.js');

suite('record', function () {
  test('is a function.', function (done) {
    assert.that(record, is.ofType('function'));
    done();
  });

  test('throws an error if fn is missing.', function (done) {
    assert.that(function () {
      record();
    }, is.throwing('Fn is missing.'));
    done();
  });

  test('throws an error if callback is missing.', function (done) {
    assert.that(function () {
      record(function () {});
    }, is.throwing('Callback is missing.'));
    done();
  });

  suite('stdout', function () {
    test('records a single call to console.log.', function (done) {
      record(function (stop) {
        /*eslint-disable no-console*/
        console.log('foo');
        /*eslint-enable no-console*/
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(stdoutText, is.equalTo('foo\n'));
        assert.that(stderrText, is.equalTo(''));
        done();
      });
    });

    test('records multiple calls to console.log.', function (done) {
      record(function (stop) {
        /*eslint-disable no-console*/
        console.log('foo');
        console.log('bar');
        /*eslint-enable no-console*/
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(stdoutText, is.equalTo('foo\nbar\n'));
        assert.that(stderrText, is.equalTo(''));
        done();
      });
    });
  });

  suite('stderr', function () {
    test('records a single call to console.error.', function (done) {
      record(function (stop) {
        /*eslint-disable no-console*/
        console.error('foo');
        /*eslint-enable no-console*/
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(stdoutText, is.equalTo(''));
        assert.that(stderrText, is.equalTo('foo\n'));
        done();
      });
    });

    test('records multiple calls to console.error.', function (done) {
      record(function (stop) {
        /*eslint-disable no-console*/
        console.error('foo');
        console.error('bar');
        /*eslint-enable no-console*/
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(stdoutText, is.equalTo(''));
        assert.that(stderrText, is.equalTo('foo\nbar\n'));
        done();
      });
    });
  });
});
