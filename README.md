# Synopsis

**string-to-jsify** is a [string-to-js](https://github.com/visionmedia/node-string-to-js) transform for [browserify](https://github.com/substack/browserify).

[![Build Status](https://travis-ci.org/pluma/string-to-jsify.png?branch=master)](https://travis-ci.org/pluma/string-to-jsify) [![NPM version](https://badge.fury.io/js/string-to-jsify.png)](http://badge.fury.io/js/string-to-jsify) [![Dependencies](https://david-dm.org/pluma/string-to-jsify.png)](https://david-dm.org/pluma/string-to-jsify)

# Install

## Node.js

### With NPM

```sh
npm install string-to-jsify
```

### From source

```sh
git clone https://github.com/pluma/string-to-jsify.git
cd string-to-jsify
npm install
make test
```

# Basic usage example

## example/partial.html

```html
<blink>wat</blink>
```

## example/app.js

```javascript
var partial = require('./partial.html');
// ...
```

## Usage

```javascript
var browserify = require('browserify'),
    str2jsify = require('string-to-jsify'),
    b = browserify('./example/app.js');

b.transform(str2jsify.filter('.html'));
b.bundle().pipe(require('fs').createWriteStream('bundle.js'));
```

# API

## str2jsify

The default browserify transform. Runs its input through `string-to-js`.

## str2jsify.filter(pattern)

Creates a browserify transform that will only be applied to files with names
matching the given pattern.

If `pattern` is a `string` or an array of strings, the transform will be
applied to all files with filenames ending with the given value (or values).

If a `RegExp` is provided, the transform will only be applied to files with
filenames matching the regular expression.

If `pattern` is empty or `null`, the transform will be applied to any file.

# License

The MIT/Expat license.
