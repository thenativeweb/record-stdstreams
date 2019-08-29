# record-stdstreams

record-stdstreams records process.stdout and process.stderr.

## Installation

```shell
$ npm install record-stdstreams
```

## Quick start

First you need to integrate record-stdstreams into your application.

```javascript
const record = require('record-stdstreams').default;
```

If you use TypeScript, use the following code instead:

```typescript
import record from 'record-stdstreams';
```

To capture output call the `record` function. It returns a `stop` function. To stop capturing call this function. The result are the captured `stdout` and `stderr` streams.

```javascript
const stop = record();

console.log('foo');
console.error('bar');

const { stdout, stderr } = stop();

console.log(stdout); // => 'foo\n'
console.log(stderr); // => 'bar\n'
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
