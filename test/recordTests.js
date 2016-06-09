'use strict';

const assert = require('assertthat');

const record = require('../lib/record.js');

suite('record', () => {
  test('is a function.', done => {
    assert.that(record).is.ofType('function');
    done();
  });

  test('throws an error if fn is missing.', done => {
    assert.that(() => {
      record();
    }).is.throwing('Fn is missing.');
    done();
  });

  test('throws an error if callback is missing.', done => {
    assert.that(() => {
      record(() => {
        // Intentionally left blank.
      });
    }).is.throwing('Callback is missing.');
    done();
  });

  test('promotes error.', done => {
    record(() => {
      throw new Error('foobar');
    }, err => {
      assert.that(err).is.not.null();
      assert.that(err.message).is.equalTo('foobar');
      done();
    });
  });

  suite('stdout', () => {
    test('records a single call to console.log.', done => {
      record(stop => {
        /* eslint-disable no-console */
        console.log('foo');
        /* eslint-enable no-console */
        stop();
      }, (err, stdoutText, stderrText) => {
        assert.that(err).is.null();
        assert.that(stdoutText).is.equalTo('foo\n');
        assert.that(stderrText).is.equalTo('');
        done();
      });
    });

    test('records multiple calls to console.log.', done => {
      record(stop => {
        /* eslint-disable no-console */
        console.log('foo');
        console.log('bar');
        /* eslint-enable no-console */
        stop();
      }, (err, stdoutText, stderrText) => {
        assert.that(err).is.null();
        assert.that(stdoutText).is.equalTo('foo\nbar\n');
        assert.that(stderrText).is.equalTo('');
        done();
      });
    });
  });

  suite('stderr', () => {
    test('records a single call to console.error.', done => {
      record(stop => {
        /* eslint-disable no-console */
        console.error('foo');
        /* eslint-enable no-console */
        stop();
      }, (err, stdoutText, stderrText) => {
        assert.that(err).is.null();
        assert.that(stdoutText).is.equalTo('');
        assert.that(stderrText).is.equalTo('foo\n');
        done();
      });
    });

    test('records multiple calls to console.error.', done => {
      record(stop => {
        /* eslint-disable no-console */
        console.error('foo');
        console.error('bar');
        /* eslint-enable no-console */
        stop();
      }, (err, stdoutText, stderrText) => {
        assert.that(err).is.null();
        assert.that(stdoutText).is.equalTo('');
        assert.that(stderrText).is.equalTo('foo\nbar\n');
        done();
      });
    });
  });
});
