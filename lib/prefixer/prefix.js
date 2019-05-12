'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _browserOrNode = require('browser-or-node');

var prefixObject = {
  css: '',
  js: ''
};

if (_browserOrNode.isBrowser) {
  var styles = window.getComputedStyle(document.documentElement);
  var prefixString = Array.prototype.slice.call(styles).join('');
  var standardPrefixString = prefixString.match(/-(moz|webkit|ms)-/);
  var operaPrefixString = prefixString.match(styles.OLink === '' && ['', 'o']);
  var prefixMatch = standardPrefixString || operaPrefixString;

  var prefix = prefixMatch ? prefixMatch[1] : '';

  prefixObject = {
    css: '-' + prefix + '-',
    js: prefix
  };

  if (prefixObject.js !== 'ms') {
    prefixObject = _extends({}, prefixObject, {
      js: '' + prefixObject.js.charAt(0).toUpperCase() + prefixObject.js.slice(1)
    });
  }
}

exports.default = prefixObject;