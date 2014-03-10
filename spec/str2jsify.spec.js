/*global describe, it */
var expect = require('expect.js'),
  str2jsify = require('../'),
  outputRe = /^\s*module\.exports\s*=\s*('[^']*'|"[^"]*");?\s*$/;

describe('str2jsify', function() {
  it('converts its input into a JS module', function(done) {
    var transform = str2jsify.configure({filenames: 'foo.html'});
    var input = 'Some arbitrary text',
      output = null,
      stream = transform('foo.html'),
      timesCalled = 0;
    stream.on('data', function(data) {
      output = data;
      timesCalled++;
    });
    stream.on('end', function() {
      expect(timesCalled).to.be(1);
      expect(output).to.contain(input);
      expect(output).to.match(outputRe);
      done();
    });
    stream.write(input);
    stream.end();
  });
  it('ignores other extensions', function(done) {
    var input = 'Some arbitrary text',
      output = null,
      stream = str2jsify('bleh.js'),
      timesCalled = 0;
    stream.on('data', function(data) {
      output = data;
      timesCalled++;
    });
    stream.on('end', function() {
      expect(output).to.contain(input);
      expect(output).to.equal(input);
      expect(timesCalled).to.be(1);
      done();
    });
    stream.write(input);
    stream.end();
  });
  it('converts files with the correct extension', function(done) {
    var transform = str2jsify.configure({extensions: '.ext'});
    var input = 'Some arbitrary text',
      output = null,
      stream = transform('bleh.ext'),
      timesCalled = 0;
    stream.on('data', function(data) {
      output = data;
      timesCalled++;
    });
    stream.on('end', function() {
      expect(output).to.match(outputRe);
      expect(timesCalled).to.be(1);
      done();
    });
    stream.write(input);
    stream.end();
  });
  it('converts files with a matching pattern', function(done) {
    var transform = str2jsify.configure({patterns: ['^foo$']});
    var input = 'Some arbitrary text',
      output = null,
      stream = transform('foo'),
      timesCalled = 0;
    stream.on('data', function(data) {
      output = data;
      timesCalled++;
    });
    stream.on('end', function() {
      expect(output).to.match(outputRe);
      expect(timesCalled).to.be(1);
      done();
    });
    stream.write(input);
    stream.end();
  });
  it('ignores non-matching patterns', function(done) {
    var transform = str2jsify.configure({patterns: ['^foo$']});
    var input = 'Some arbitrary text',
      output = null,
      stream = transform('bar'),
      timesCalled = 0;
    stream.on('data', function(data) {
      output = data;
      timesCalled++;
    });
    stream.on('end', function() {
      expect(output).to.contain(input);
      expect(output).to.equal(input);
      expect(timesCalled).to.be(1);
      output = null;
      stream = transform('FOO');
      timesCalled = 0;
      stream.on('data', function(data) {
        output = data;
        timesCalled++;
      });
      stream.on('end', function() {
        expect(output).to.contain(input);
        expect(output).to.equal(input);
        expect(timesCalled).to.be(1);
        done();
      });
      stream.write(input);
      stream.end();
    });
    stream.write(input);
    stream.end();
  });
});