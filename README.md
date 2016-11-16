# dojo-streams

[![Build Status](https://travis-ci.org/dojo/streams.svg?branch=master)](https://travis-ci.org/dojo/streams)
[![codecov](https://codecov.io/gh/dojo/streams/branch/master/graph/badge.svg)](https://codecov.io/gh/dojo/streams)
[![npm version](https://badge.fury.io/js/dojo-streams.svg)](http://badge.fury.io/js/dojo-streams)

An implementation of the [WHATWG Streams Spec](https://streams.spec.whatwg.org/).

## Features

Two main objects in this module are `ReadableStream` and `WritableStream`.

### ReadableStream

A [readable stream](https://streams.spec.whatwg.org/#rs-model) represents a source of data, from which you can read.

```typescript
const reader = readableStream.getReader();

reader.read().then(
  ({ value, done }) => {
    if (done) {
      console.log("The stream was already closed!");
    } else {
      console.log(value);
    }
  },
  e => console.error("The stream became errored and cannot be read from!", e)
);
```

### WritableStream

A [writable stream](https://streams.spec.whatwg.org/#ws-model) represents a destination for data, into which you can write.

```typescript
const writer = writableStream.getWriter();
writer.write('data');
writer.close();
```

## How do I contribute?

We appreciate your interest!  Please see the [Dojo 2 Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines and Style Guide.

## Testing

Test cases MUST be written using [Intern](https://theintern.github.io) using the Object test interface and Assert assertion interface.

90% branch coverage MUST be provided for all code submitted to this repository, as reported by istanbul’s combined coverage results for all supported platforms.

To test locally in node run:

`grunt test`

To test against browsers with a local selenium server run:

`grunt test:local`

To test against BrowserStack or Sauce Labs run:

`grunt test:browserstack`

or

`grunt test:saucelabs`

## Licensing information

© 2004–2016 Dojo Foundation & contributors. [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
