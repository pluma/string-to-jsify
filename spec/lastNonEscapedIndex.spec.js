/*global describe, it */
var expect = require('expect.js'),
  rewire = require('rewire'),
  str2jsify = rewire('../'),
  lastNonEscapedIndex = str2jsify.__get__('lastNonEscapedIndex');

describe('lastNonEscapedIndex', function() {
  it('is a function', function() {
    expect(lastNonEscapedIndex).to.be.a('function');
  });
  it('returns a number', function() {
    expect(lastNonEscapedIndex('x', 'x')).to.be.a('number');
    expect(lastNonEscapedIndex('', 'x')).to.be.a('number');
  });
  it('returns the last index of the substring', function() {
    expect(lastNonEscapedIndex('baaaa', 'b')).to.equal(0);
    expect(lastNonEscapedIndex('babaa', 'b')).to.equal(2);
    expect(lastNonEscapedIndex('baaab', 'b')).to.equal(4);
    expect(lastNonEscapedIndex('aaaab', 'b')).to.equal(4);
    expect(lastNonEscapedIndex('aaaab', 'ab')).to.equal(3);
    expect(lastNonEscapedIndex('baaab', 'ba')).to.equal(0);
  });
  it('optionally ignores escaped matches', function() {
    expect(lastNonEscapedIndex('a\\x', 'x', true)).to.equal(-1);
    expect(lastNonEscapedIndex('a\\xa', 'xa', true)).to.equal(-1);
    expect(lastNonEscapedIndex('\\x', 'x', true)).to.equal(-1);
    expect(lastNonEscapedIndex('\\xa', 'xa', true)).to.equal(-1);
    expect(lastNonEscapedIndex('\\xx', 'x', true)).to.equal(2);
    expect(lastNonEscapedIndex('\\xxa', 'xa', true)).to.equal(2);
    expect(lastNonEscapedIndex('\\\\x', 'x', true)).to.equal(2);
    expect(lastNonEscapedIndex('\\\\xa', 'xa', true)).to.equal(2);
    expect(lastNonEscapedIndex('\\\\\\x', 'x', true)).to.equal(-1);
    expect(lastNonEscapedIndex('\\\\\\xa', 'xa', true)).to.equal(-1);
  });
});