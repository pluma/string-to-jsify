/*! string-to-jsify 0.3.0 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */
var transformTools = require('browserify-transform-tools');

function splat(x) {
  if (Array.isArray(x)) {
    return x;
  }
  return [x];
}

function parseRegExp(pattern) {
  if (pattern instanceof RegExp) {
    return pattern;
  }
  if (pattern.charAt(0) === '/') {
    var i = pattern.slice(1).indexOf('/');
    if (~i) {
      return new RegExp(pattern.slice(1, i + 1), pattern.slice(i + 2));
    }
  }
  return new RegExp(pattern);
}

function matches(cfg, name) {
  return (cfg.filenames.some(function(filename) {
    return filename === name;
  })) || (cfg.extensions.some(function(extension) {
    return extension.test(name);
  })) || (cfg.patterns.some(function(pattern) {
    return pattern.test(name);
  }));
}

function prepare(cfg) {
  var cache = {};
  cache.filenames = (cfg.filenames ? splat(cfg.filenames) : []);
  cache.extensions = (cfg.extensions ? splat(cfg.extensions).map(function(ext) {
    return (new RegExp(ext + '$'));
  }) : []);
  cache.patterns = (cfg.patterns ? splat(cfg.patterns).map(function(pattern) {
    return parseRegExp(pattern);
  }) : []);
  return cache;
}

module.exports = transformTools.makeStringTransform('string-to-jsify', {}, function(src, opts, done) {
  if (opts.config) {
    if (!opts.config._cache) {
      opts.config._cache = prepare(opts.config);
    }
    if (matches(opts.config._cache, opts.file)) {
      done(null, 'module.exports = ' + JSON.stringify(src) + ';');
      return;
    }
  }
  done(null, src);
});
