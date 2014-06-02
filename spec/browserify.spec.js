/*global describe, it */
var expect = require('expect.js');
var cp = require('child_process');
var fs = require('fs');

describe('browserify -t str2jsify', function() {
  it('converts its input into a JS module', function(done) {
    /*jshint evil: true */
    var proc = cp.exec('cd example; node_modules/.bin/browserify -t string-to-jsify app.js');
    var data = [];
    proc.stdout.on('data', function(chunk) {
      data.push(chunk.toString('utf-8'));
    });
    proc.stdout.on('close', function() {
      var js = 'var window = {};\n' + data.join('') + '\nwindow.partial;';
      var result = eval(js);
      expect(result).to.eql(fs.readFileSync('example/partial.html', 'utf-8'));
      done();
    });
  });
});