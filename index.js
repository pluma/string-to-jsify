/*! string-to-jsify 0.1.0 Copyright (c) 2013 Alan Plum. MIT licensed. */
var through = require('through'),
    str2js = require('string-to-js');

function factory(pattern) {
    if (typeof pattern === 'string') {
        pattern = [pattern];
    }
    if (Array.isArray(pattern)) {
        pattern = new RegExp(pattern.join('|') + '$');
    }
    return function(file) {
        if (pattern && !pattern.test(file)) {
            return through();
        }
        var data = '';
        function write(buf) {
            data += buf;
        }
        function end() {
            this.queue(str2js(data));
            this.queue(null);
        }
        return through(write, end);
    };
}

var str2jsify = factory();
str2jsify.filter = factory;
module.exports = str2jsify;