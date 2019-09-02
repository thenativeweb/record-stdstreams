import assert from 'assertthat';
import record from '../../lib/record';

suite('record', (): void => {
  test('is a function.', async (): Promise<void> => {
    assert.that(record).is.ofType('function');
  });

  test('returns a function and records empty strings.', async (): Promise<void> => {
    const stop = record();

    assert.that(stop).is.ofType('function');

    const { stdout, stderr } = stop();

    assert.that(stdout).is.equalTo('');
    assert.that(stderr).is.equalTo('');
  });

  suite('stdout', (): void => {
    test('records a single call to console.log.', async (): Promise<void> => {
      const stop = record();

      /* eslint-disable no-console */
      console.log('foo');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('foo\n');
      assert.that(stderr).is.equalTo('');
    });

    test('records multiple calls to console.log.', async (): Promise<void> => {
      const stop = record();

      /* eslint-disable no-console */
      console.log('foo');
      console.log('bar');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('foo\nbar\n');
      assert.that(stderr).is.equalTo('');
    });

    test('accepts write with a single parameter.', async (): Promise<void> => {
      const stop = record();

      process.stdout.write('foo');

      const { stdout } = stop();

      assert.that(stdout).is.equalTo('foo');
    });
  });

  suite('stderr', (): void => {
    test('records a single call to console.error.', async (): Promise<void> => {
      const stop = record();

      /* eslint-disable no-console */
      console.error('foo');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('');
      assert.that(stderr).is.equalTo('foo\n');
    });

    test('records multiple calls to console.error.', async (): Promise<void> => {
      const stop = record();

      /* eslint-disable no-console */
      console.error('foo');
      console.error('bar');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('');
      assert.that(stderr).is.equalTo('foo\nbar\n');
    });

    test('accepts write with a single parameter.', async (): Promise<void> => {
      const stop = record();

      process.stderr.write('foo');

      const { stderr } = stop();

      assert.that(stderr).is.equalTo('foo');
    });
  });
});
