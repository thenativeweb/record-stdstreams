'use strict';

const assert = require('assertthat');

const record = require('../../lib/record.js');

suite('record', () => {
  test('is a function.', done => {
    assert.that(record).is.ofType('function');
    done();
  });

  test('returns a function and records empty strings.', done => {
    const stop = record();

    assert.that(stop).is.ofType('function');

    const { stdout, stderr } = stop();

    assert.that(stdout).is.equalTo('');
    assert.that(stderr).is.equalTo('');
    done();
  });

  suite('stdout', () => {
    test('records a single call to console.log.', done => {
      const stop = record();

      /* eslint-disable no-console */
      console.log('foo');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('foo\n');
      assert.that(stderr).is.equalTo('');
      done();
    });

    test('records multiple calls to console.log.', done => {
      const stop = record();

      /* eslint-disable no-console */
      console.log('foo');
      console.log('bar');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('foo\nbar\n');
      assert.that(stderr).is.equalTo('');
      done();
    });
  });

  suite('stderr', () => {
    test('records a single call to console.error.', done => {
      const stop = record();

      /* eslint-disable no-console */
      console.error('foo');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('');
      assert.that(stderr).is.equalTo('foo\n');
      done();
    });

    test('records multiple calls to console.error.', done => {
      const stop = record();

      /* eslint-disable no-console */
      console.error('foo');
      console.error('bar');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('');
      assert.that(stderr).is.equalTo('foo\nbar\n');
      done();
    });
  });
});
