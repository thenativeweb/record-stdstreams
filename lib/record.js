'use strict';

var record = function (fn, callback) {
  var stderrText = '',
      stdoutText = '';

  var oldStderrWrite = process.stderr.write,
      oldStdoutWrite = process.stdout.write;

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

  fn(function () {
    process.stdout.write = oldStdoutWrite;
    process.stderr.write = oldStderrWrite;

    callback(stdoutText, stderrText);
  });
};

module.exports = record;
