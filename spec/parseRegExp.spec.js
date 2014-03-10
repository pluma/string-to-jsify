/*global describe, it */
var expect = require('expect.js'),
  rewire = require('rewire'),
  str2jsify = rewire('../'),
  parseRegExp = str2jsify.__get__('parseRegExp');

describe('parseRegExp', function() {
  it('is a function', function() {
    expect(parseRegExp).to.be.a('function');
  });
  it('returns a RegExp', function() {
    expect(parseRegExp('')).to.be.a(RegExp);
  });
  it('returns RegExp objects unmodified', function() {
    var re = /x/;
    expect(parseRegExp(re)).to.equal(re);
  });
  it('converts strings to RegExps', function() {
    var str = '^he.l?o$',
      re = parseRegExp(str);
    expect(re.source).to.equal(str);
    expect(re.ignoreCase).to.be(false);
    expect(re.multiline).to.be(false);
  });
  it('understands flags', function() {
    var str = '/^he.l?o$/i',
      re = parseRegExp(str);
    expect(re.source).to.equal(str.slice(1, str.length - 2));
    expect(re.ignoreCase).to.be(true);
    expect(re.multiline).to.be(false);
  });
  it('leaves pseudo-flags alone', function() {
    var str = '/he.l?o\\/i',
      re = parseRegExp(str);
    expect(re.source).to.equal(str);
    expect(re.ignoreCase).to.be(false);
    expect(re.multiline).to.be(false);
  });
});