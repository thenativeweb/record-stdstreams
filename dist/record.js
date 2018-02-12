'use strict';

var record = function record() {
  var oldStderrWrite = process.stderr.write,
      oldStdoutWrite = process.stdout.write;

  var stderr = '',
      stdout = '';

  process.stdout.write = function (text) {
    stdout += text;
  };
  process.stderr.write = function (text) {
    stderr += text;
  };

  var stop = function stop() {
    process.stdout.write = oldStdoutWrite;
    process.stderr.write = oldStderrWrite;

    return { stdout: stdout, stderr: stderr };
  };

  return stop;
};

module.exports = record;