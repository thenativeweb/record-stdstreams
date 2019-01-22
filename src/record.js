'use strict';

const record = function () {
  const oldStderrWrite = process.stderr.write,
        oldStdoutWrite = process.stdout.write;

  let stderr = '',
      stdout = '';

  process.stdout.write = function (text) {
    stdout += text;
  };
  process.stderr.write = function (text) {
    stderr += text;
  };

  const stop = function () {
    process.stdout.write = oldStdoutWrite;
    process.stderr.write = oldStderrWrite;

    return { stdout, stderr };
  };

  return stop;
};

module.exports = record;
