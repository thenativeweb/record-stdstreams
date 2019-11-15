import { assert } from 'assertthat';
import { record } from '../../lib/record';
import sinon from 'sinon';

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
    test('records a single call to console.log and passes it through.', async (): Promise<void> => {
      const spyStdout = sinon.spy(process.stdout, 'write');
      const spyStderr = sinon.spy(process.stderr, 'write');

      const stop = record();

      /* eslint-disable no-console */
      console.log('foo');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('foo\n');
      assert.that(stderr).is.equalTo('');

      assert.that(spyStdout.callCount).is.equalTo(1);
      assert.that(spyStdout.firstCall.args[0]).is.equalTo('foo\n');
      assert.that(spyStderr.callCount).is.equalTo(0);
    });

    test('records multiple calls to console.log.', async (): Promise<void> => {
      const spyStdout = sinon.spy(process.stdout, 'write');
      const spyStderr = sinon.spy(process.stderr, 'write');

      const stop = record();

      /* eslint-disable no-console */
      console.log('foo');
      console.log('bar');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('foo\nbar\n');
      assert.that(stderr).is.equalTo('');

      assert.that(spyStdout.callCount).is.equalTo(2);
      assert.that(spyStdout.firstCall.args[0]).is.equalTo('foo\n');
      assert.that(spyStdout.secondCall.args[0]).is.equalTo('bar\n');
      assert.that(spyStderr.callCount).is.equalTo(0);
    });

    test('accepts write with a single parameter.', async (): Promise<void> => {
      const spyStdout = sinon.spy(process.stdout, 'write');
      const spyStderr = sinon.spy(process.stderr, 'write');

      const stop = record();

      process.stdout.write('foo');

      const { stdout } = stop();

      assert.that(stdout).is.equalTo('foo');

      assert.that(spyStdout.callCount).is.equalTo(1);
      assert.that(spyStdout.firstCall.args[0]).is.equalTo('foo');
      assert.that(spyStderr.callCount).is.equalTo(0);
    });
  });

  suite('stderr', (): void => {
    test('records a single call to console.error.', async (): Promise<void> => {
      const spyStdout = sinon.spy(process.stdout, 'write');
      const spyStderr = sinon.spy(process.stderr, 'write');

      const stop = record();

      /* eslint-disable no-console */
      console.error('foo');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('');
      assert.that(stderr).is.equalTo('foo\n');

      assert.that(spyStdout.callCount).is.equalTo(0);
      assert.that(spyStderr.callCount).is.equalTo(1);
      assert.that(spyStderr.firstCall.args[0]).is.equalTo('foo\n');
    });

    test('records multiple calls to console.error.', async (): Promise<void> => {
      const spyStdout = sinon.spy(process.stdout, 'write');
      const spyStderr = sinon.spy(process.stderr, 'write');

      const stop = record();

      /* eslint-disable no-console */
      console.error('foo');
      console.error('bar');
      /* eslint-enable no-console */

      const { stdout, stderr } = stop();

      assert.that(stdout).is.equalTo('');
      assert.that(stderr).is.equalTo('foo\nbar\n');

      assert.that(spyStdout.callCount).is.equalTo(0);
      assert.that(spyStderr.callCount).is.equalTo(2);
      assert.that(spyStderr.firstCall.args[0]).is.equalTo('foo\n');
      assert.that(spyStderr.secondCall.args[0]).is.equalTo('bar\n');
    });

    test('accepts write with a single parameter.', async (): Promise<void> => {
      const spyStdout = sinon.spy(process.stdout, 'write');
      const spyStderr = sinon.spy(process.stderr, 'write');

      const stop = record();

      process.stderr.write('foo');

      const { stderr } = stop();

      assert.that(stderr).is.equalTo('foo');

      assert.that(spyStdout.callCount).is.equalTo(0);
      assert.that(spyStderr.callCount).is.equalTo(1);
      assert.that(spyStderr.firstCall.args[0]).is.equalTo('foo');
    });
  });

  suite('disable passthrough', (): void => {
    suite('stdout', (): void => {
      test('records output and does not let it through.', async (): Promise<void> => {
        const spyStdout = sinon.spy(process.stdout, 'write');
        const spyStderr = sinon.spy(process.stderr, 'write');

        const stop = record(false);

        /* eslint-disable no-console */
        console.log('foo');
        /* eslint-enable no-console */

        const { stdout, stderr } = stop();

        assert.that(stdout).is.equalTo('foo\n');
        assert.that(stderr).is.equalTo('');

        assert.that(spyStdout.callCount).is.equalTo(0);
        assert.that(spyStderr.callCount).is.equalTo(0);
      });
    });

    suite('stderr', (): void => {
      test('records output and does not let it through.', async (): Promise<void> => {
        const spyStdout = sinon.spy(process.stdout, 'write');
        const spyStderr = sinon.spy(process.stderr, 'write');

        const stop = record(false);

        /* eslint-disable no-console */
        console.error('foo');
        /* eslint-enable no-console */

        const { stdout, stderr } = stop();

        assert.that(stdout).is.equalTo('');
        assert.that(stderr).is.equalTo('foo\n');

        assert.that(spyStdout.callCount).is.equalTo(0);
        assert.that(spyStderr.callCount).is.equalTo(0);
      });
    });
  });
});
