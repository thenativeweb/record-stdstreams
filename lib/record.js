'use strict';

var record = function (fn, callback) {
  var stderrText = '',
      stdoutText = '';

  var oldStderrWrite = process.stderr.write,
      oldStdoutWrite = process.stdout.write;

  var stop = function () {
    process.stdout.write = oldStdoutWrite;
    process.stderr.write = oldStderrWrite;

    callback(stdoutText, stderrText);
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
    stop();
  }
};

module.exports = record;
