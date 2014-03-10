/*global describe, it */
var expect = require('expect.js'),
  rewire = require('rewire'),
  str2jsify = rewire('../'),
  splat = str2jsify.__get__('splat');

describe('splat', function() {
  it('is a function', function() {
    expect(splat).to.be.a('function');
  });
  it('returns an array', function() {
    expect(splat('')).to.be.an('array');
  });
  it('wraps things in arrays', function() {
    var obj = {};
    expect(splat('foo')).to.eql(['foo']);
    expect(splat({})).to.eql([{}]);
    expect(splat(obj)).to.eql([obj]);
    expect(splat(obj)[0]).to.equal(obj);
    expect(splat(undefined)).to.eql([undefined]);
    expect(splat(null)).to.eql([null]);
    expect(splat(true)).to.eql([true]);
    expect(splat(arguments)).to.eql([arguments]);
  });
  it('returns arrays unmodified', function() {
    var arr = ['a'];
    expect(splat(arr)).to.equal(arr);
    expect(arr).to.eql(['a']);
  });
});