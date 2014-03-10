/*! string-to-jsify 0.3.1 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */
var transformTools = require('browserify-transform-tools');

function splat(x) {
  if (Array.isArray(x)) {
    return x;
  }
  return [x];
}

function lastNonEscapedIndex(haystack, needle) {
  for (var i = haystack.length - needle.length; i >= 0; i--) {
    if (haystack.slice(i).indexOf(needle) === 0) {
      if (i === 0 || haystack.charAt(i - 1) !== '\\') return i;
      var n = 0;
      for (var j = i - 1; j >= 0; j--) {
        if (haystack.charAt(j) !== '\\') break;
        n += 1;
      }
      if (n % 2 === 0) return i;
    }
  }
  return -1;
}

function parseRegExp(pattern) {
  if (pattern instanceof RegExp) {
    return pattern;
  }
  if (pattern.charAt(0) === '/') {
    var i = lastNonEscapedIndex(pattern.slice(1), '/');
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
