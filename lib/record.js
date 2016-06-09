'use strict';

const record = function (fn, callback) {
  let stderrText = '',
      stdoutText = '';

  const oldStderrWrite = process.stderr.write,
        oldStdoutWrite = process.stdout.write;

  const stop = function (err) {
    err = err || null;

    process.stdout.write = oldStdoutWrite;
    process.stderr.write = oldStderrWrite;

    callback(err, stdoutText, stderrText);
  };

  if (!fn) {
    throw new Error('Fn is missing.');
  }
  if (!callback) {
    throw new Error('Callback is missing.');
  }

  process.stdout.write = function (text) {
    stdoutText += text;
  };

  process.stderr.write = function (text) {
    stderrText += text;
  };

  try {
    fn(stop);
  } catch (err) {
    stop(err);
  }
};

module.exports = record;
