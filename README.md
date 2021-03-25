# record-stdstreams

record-stdstreams records process.stdout and process.stderr.

## Status

| Category         | Status                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/record-stdstreams)](https://www.npmjs.com/package/record-stdstreams) |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/record-stdstreams)                                     |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/record-stdstreams)                                 |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/record-stdstreams/workflows/Release/badge.svg?branch=main)   |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/record-stdstreams)                           |

## Installation

```shell
$ npm install record-stdstreams
```

## Quick start

First you need to integrate record-stdstreams into your application.

```javascript
const { record } = require('record-stdstreams');
```

If you use TypeScript, use the following code instead:

```typescript
import { record } from 'record-stdstreams';
```

To capture output call the `record` function. It returns a `stop` function. To stop capturing call this function. The result are the captured `stdout` and `stderr` streams.

```javascript
const stop = record();

console.log('foo');
console.error('bar');

const { stdout, stderr } = stop();

console.log(stdout);
// => 'foo\n'

console.log(stderr);
// => 'bar\n'
```

### Suppressing output during recording

To record the std streams, but suppress their output, call record with `false` as parameter:

```javascript
const stop = record(false);

console.log('foo');
// => Does not produce any output.

const { stdout } = stop();

console.log(stdout);
// => 'foo\n'
```

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```
