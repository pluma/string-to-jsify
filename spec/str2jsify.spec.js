/*global describe, it */
var expect = require('expect.js'),
    str2jsify = require('../'),
    outputRe = /^\s*module\.exports\s*=\s*('[^']*'|"[^"]*");?\s*$/;

describe('str2jsify', function() {
    it('converts its input into a JS module', function() {
        var input = 'Some arbitrary text',
            output = null,
            stream = str2jsify(),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.contain(input);
        expect(output).to.match(outputRe);
        expect(timesCalled).to.be(1);
    });
});

describe('str2jsify.filter(/\\.ext/)', function() {
    var filtered = str2jsify.filter(/\.ext/);
    it('ignores other extensions', function() {
        var input = 'Some arbitrary text',
            output = null,
            stream = filtered('bleh.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.contain(input);
        expect(output).to.equal(input);
        expect(timesCalled).to.be(1);
    });
    it('converts files with the correct extension', function() {
        var input = 'Some arbitrary text',
            output = null,
            stream = filtered('bleh.ext'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.match(outputRe);
        expect(timesCalled).to.be(1);
    });
});

describe('str2jsify.filter(".ext")', function() {
    var filtered = str2jsify.filter(/\.ext/);
    it('ignores other extensions', function() {
        var input = 'Some arbitrary text',
            output = null,
            stream = filtered('bleh.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.contain(input);
        expect(output).to.equal(input);
        expect(timesCalled).to.be(1);
    });
    it('converts files with the correct extension', function() {
        var input = 'Some arbitrary text',
            output = null,
            stream = filtered('bleh.ext'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.match(outputRe);
        expect(timesCalled).to.be(1);
    });
});

describe('str2jsify.filter([".ext", ".stuff"])', function() {
    var exts = ['.ext', '.stuff'];
    var filtered = str2jsify.filter(exts);
    it('ignores other extensions', function() {
        var input = 'Some arbitrary text',
            output = null,
            stream = filtered('bleh.js'),
            timesCalled = 0;
        stream.on('data', function(data) {
            output = data;
            timesCalled++;
        });
        stream.write(input);
        stream.end();
        expect(output).to.contain(input);
        expect(output).to.equal(input);
        expect(timesCalled).to.be(1);
    });
    it('converts files with the correct extension', function() {
        var input = 'Some arbitrary text';
        exts.forEach(function(ext) {
            var output = null,
                stream = filtered('bleh' + ext),
                timesCalled = 0;
            stream.on('data', function(data) {
                output = data;
                timesCalled++;
            });
            stream.write(input);
            stream.end();
            expect(output).to.match(outputRe);
            expect(timesCalled).to.be(1);
        });
    });
});