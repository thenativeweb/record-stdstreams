/* eslint-disable func-style, @typescript-eslint/unbound-method */
const record = function (): (() => ({ stdout: string; stderr: string })) {
  const oldStderrWrite = process.stderr.write.bind(process.stderr),
        oldStdoutWrite = process.stdout.write.bind(process.stdout);

  let stderr = '',
      stdout = '';

  function collectStderr (text: string | Uint8Array, encoding?: string | ((err?: Error | null) => void), cb?: (err?: Error | null) => void): boolean {
    stderr += text.toString();

    if (typeof text === 'string' && typeof encoding === 'string') {
      return oldStderrWrite(text, encoding, cb);
    }

    if (typeof encoding === 'function') {
      return oldStderrWrite(text, encoding);
    }

    throw new Error('Invalid operation.');
  }

  function collectStdout (text: string | Uint8Array, encoding?: string | ((err?: Error | null) => void), cb?: (err?: Error | null) => void): boolean {
    stdout += text.toString();

    if (typeof text === 'string' && typeof encoding === 'string') {
      return oldStdoutWrite(text, encoding, cb);
    }

    if (typeof encoding === 'function') {
      return oldStdoutWrite(text, encoding);
    }

    throw new Error('Invalid operation.');
  }

  process.stderr.write = collectStderr;
  process.stdout.write = collectStdout;

  const stop = function (): ({ stdout: string; stderr: string }) {
    process.stderr.write = oldStderrWrite.bind(process.stderr);
    process.stdout.write = oldStdoutWrite.bind(process.stdout);

    return { stdout, stderr };
  };

  return stop;
};
/* eslint-enable func-style, @typescript-eslint/unbound-method */

export default record;
