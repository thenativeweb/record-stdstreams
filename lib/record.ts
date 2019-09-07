/* eslint-disable func-style, @typescript-eslint/unbound-method */
const record = function (passThrough = true): (() => ({ stdout: string; stderr: string })) {
  const oldStderrWrite = process.stderr.write.bind(process.stderr),
        oldStdoutWrite = process.stdout.write.bind(process.stdout);

  let stderr = '',
      stdout = '';

  const collectStderr = (text: any, encoding?: any, cb?: any): boolean => {
    stderr += text.toString();

    if (!passThrough) {
      return true;
    }

    return oldStderrWrite(text, encoding, cb);
  };

  const collectStdout = (text: any, encoding?: any, cb?: any): boolean => {
    stdout += text.toString();

    if (!passThrough) {
      return true;
    }

    return oldStdoutWrite(text, encoding, cb);
  };

  process.stderr.write = collectStderr;
  process.stdout.write = collectStdout;

  const stop = function (): ({ stdout: string; stderr: string }) {
    process.stderr.write = oldStderrWrite;
    process.stdout.write = oldStdoutWrite;

    return { stdout, stderr };
  };

  return stop;
};
/* eslint-enable func-style, @typescript-eslint/unbound-method */

export default record;
