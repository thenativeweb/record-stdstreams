# record-stdstreams

record-stdstreams captures process.stdout and process.stderr.

## Installation

```bash
$ npm install record-stdstreams
```

## Quick start

First you need to integrate record-stdstreams into your application.

```javascript
const record = require('record-stdstreams');
```

To capture output call the `record` function and provide two functions as parameters: The first function contains the code you want to capture, the second one is the callback that is called once capturing has been stopped.

```javascript
record(stop => {
  // ...
  console.log('foo');
  console.error('bar');
  // ...
  stop();
}, (err, stdoutText, stderrText) => {
  console.log(stdoutText); // => 'foo\n'
  console.log(stderrText); // => 'bar\n'
});
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot build-server
```

## License

The MIT License (MIT)
Copyright (c) 2015-2016 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
