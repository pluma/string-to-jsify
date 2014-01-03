# Synopsis

**string-to-jsify** is a [browserify](https://github.com/substack/node-browserify) transform that allows you to load arbitrary text files as node modules.

This library uses [browserify-transform-tools](https://github.com/benbria/browserify-transform-tools), so you can also supply the configuration by adding a `string-to-jsify` field to your project's `package.json` file.

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

b.transform(str2jsify.configure({extensions: '.html'}));
b.bundle().pipe(require('fs').createWriteStream('bundle.js'));
```

## Usage with package.json

### package.json

```json
{
    "name": "my-awesome-project",
    "devDependencies": {
        "browserify": "*",
        "string-to-jsify": "*"
    },
    "string-to-jsify": {
        "extensions": [".html", ".txt"],
        "patterns": ["/^README(\.[a-z]+)?$/i", "[a-z]+\.md"]
    }
}
```

### Usage (API)

```javascript
var browserify = require('browserify'),
    str2jsify = require('string-to-jsify'),
    b = browserify('./example/app.js');

b.transform(str2jsify);
b.bundle().pipe(require('fs').createWriteStream('bundle.js'));
```

### Usage (Shell)

```sh
browserify -t string-to-jsify ./example/app.js > bundle.js
```

# API

## str2jsify.configure(opts)

Creates a browserify transform that will only be applied to files with names
matching any of the given options (if the value is not an array, it will be wrapped in one automatically).

### opts.patterns

An array of regular expressions or strings representing regular expressions that will be applied to the filename, e.g. `/^text-/i`, `"/^text-/i"` or simply `"^text-"`.

### opts.extensions

An array of file extensions, e.g. `.txt` or `.html`.

### opts.filenames

An array of file names, e.g. `README.md`.

# License

The code is released into the Public Domain according to the terms of [CC0](http://creativecommons.org/publicdomain/zero/1.0/).
